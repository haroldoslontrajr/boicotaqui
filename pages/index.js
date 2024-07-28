'use client'

import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Post from "@layouts/partials/Post";
import Sidebar from "@layouts/partials/Sidebar";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";

import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { FaRegCalendar, FaUserAlt } from "react-icons/fa";
const { blog_folder } = config.settings;

const Home = ({
  banner,
  posts,
  featured_posts,
  recent_posts,
  categories,
  promotion,
}) => {
  // define state
  const sortPostByDate = sortByDate(posts);
  const postsByDate = sortPostByDate.filter(
    (post) => !post.frontmatter.featured
  );
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );



  return (

    <Base>
      {/* Banner */}
      <section className="banner relative pb-0 bg-cover bg-center bg-[url('/images/home-bg.png')] border-y-4 border-gray-800">

        <div className="container">
          <div className="row flex-wrap items-center justify-center lg:flex-row">
            {banner.image_enable && (
              <div className="col-9 lg:col-6">
                <ImageFallback
                  className="mx-auto object-contain"
                  src={banner.image}
                  width={548}
                  height={443}
                  priority={true}
                  alt="Banner Image"
                />
              </div>
            )}
            <div className={banner.image_enable ? "mt-12 text-center lg:mt-0 lg:text-left lg:col-6 md:text-3xl sm:text-3xl" : "sm:text-3xl md:text-3xl mt-12 text-center lg:mt-0 lg:text-left lg:col-12"}>
              <div className="banner-title">
                {markdownify(banner.title, "h1", "pt-2")}
                {markdownify(banner.title_small, "span", "leading-8")}
              </div>
              {banner.button.enable && (
                <Link
                  className="btn bg-theme-light rounded-lg border-black text-dark my-4 text-lg"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  {banner.button.label}
                </Link>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Home main */}
      <section className="section pt-0">
        <div className="container">
          <div className="row items-start">
            <div className="lg:col-8">
              {/* Featured posts */}
              {featured_posts.enable && (
                <div className="section">

                  <div className="rounded">
                    <div className="row">
                      <div className="md:col-6">
                        <Post post={featuredPosts.filter(p => p.frontmatter.highlight === 0)[0]} />
                      </div>
                      <div className="mt-8 max-h-[480px] md:mt-0 md:col-6">
                          {featuredPosts
                          .sort((a, b) => a.frontmatter.highlight - b.frontmatter.highlight)
                          .slice(1, 5)
                          .map((post, i, arr) => (

                            <div
                              className={`mb-6 flex items-center pb-6 ${i !== arr.length - 1 &&
                                "border-b border-border dark:border-darkmode-border"
                                }`}
                              key={`key-${i}`}
                            >
                                {post.frontmatter.image && (
                                  <Link
                                  href={`/${blog_folder}/${post.slug}`}
                                  className="mr-3"
                                >
                                  <ImageFallback
                                    className=" h-[85px] rounded object-cover"
                                    src={post.frontmatter.image}
                                    alt={post.frontmatter.title}
                                    width={105}
                                    height={85}
                                  />
                                  </Link>
                                )}
                                <div>

                                  <ul className="flex items-center space-x-4 text-white">
                                    <li className="inline-flex items-center font-secondary text-xs leading-3">
                                      <FaRegCalendar className="mr-1.5" />
                                      {dateFormat(post.frontmatter.date)}
                                    </li>
                                    <li>
                                      <span
                                        className="inline-flex items-center font-secondary text-xs leading-3"
                                      >
                                        <FaUserAlt className="mr-1.5" />
                                        {post.frontmatter.author}
                                      </span>
                                    </li>

                                  </ul>


                                  <h3 className="h5">
                                    <Link
                                      href={`/${blog_folder}/${post.slug}`}
                                      className="block hover:text-primary"
                                    >
                                      {post.frontmatter.title}
                                    </Link>
                                  </h3>

                                </div>

                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Promotion */}
              {promotion.enable && (
                <Link href={promotion.link} className="section block pt-0 my-12">
                  <ImageFallback
                    className="h-full w-full"
                    height="115"
                    width="800"
                    src={promotion.image}
                    alt="promotion"
                  />
                </Link>
              )}

              {/* Recent Posts */}
              {recent_posts.enable && (
                <div className="section pt-0">
                  {/*markdownify(recent_posts.title, "h2", "section-title")*/}
                  <div className="rounded">
                    <div className="row">
                      {postsByDate.slice(0, 4).map((post) => (
                        <div className="mb-8 md:col-6" key={post.slug}>
                          <Post post={post} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* sidebar */}
            <Sidebar
              className={"lg:mt-[4rem]"}
              posts={posts}
              categories={categories}
            />
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, featured_posts, recent_posts, promotion } = frontmatter;
  const posts = getSinglePage(`content/${blog_folder}`);
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");

  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.includes(category)
    );
    return {
      name: category,
      posts: filteredPosts.length,
    };
  });

  return {
    props: {
      banner: banner,
      posts: posts,
      featured_posts,
      recent_posts,
      promotion,
      categories: categoriesWithPostsCount,
    },
  };
};
