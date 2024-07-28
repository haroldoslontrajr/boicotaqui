import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import Link from "next/link";
import { FaRegCalendar, FaUserAlt } from "react-icons/fa";
import { markdownify } from "@lib/utils/textConverter";

const Post = ({ post }) => {
  const { blog_folder } = config.settings;
  const { meta_author } = config.metadata;
  const author = post.frontmatter.author ? post.frontmatter.author : meta_author;
  return (
    <div className="post">

      <div className="relative">
        {post.frontmatter.image && (
          <Link
          href={`/${blog_folder}/${post.slug}`}
          className="block "
        >
          <ImageFallback
            className="rounded"
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            width={405}
            height={208}
          />
          </Link>
        )}
        <ul className="absolute top-3 left-2 flex flex-wrap items-center">
          {post.frontmatter.categories.map((tag, index) => (
            <li
              className="mx-2 inline-flex rounded-[35px] bg-primary px-3 text-white"
              key={"tag-" + index}
            >
              <Link
                className="capitalize"
                href={`/categories/${tag.replace(" ", "-")}`}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex items-center space-x-4 text-white mt-2">
      <li className="inline-flex items-center font-secondary text-xs leading-3">
          <FaRegCalendar className="mr-1.5" />
          {dateFormat(post.frontmatter.date)}
        </li>
        <li>
          <span
            className="inline-flex items-center font-secondary text-xs leading-3"

          >
            <FaUserAlt className="mr-1.5" />
            {author}
          </span>
        </li>

      </ul>
      <h3 className="h5 mb-2">
        <Link
          href={`/${blog_folder}/${post.slug}`}
          className="block hover:text-primary"
        >
          {post.frontmatter.title}
        </Link>
      </h3>

      <p>{markdownify(post.frontmatter.description)}</p>
      <Link
        className="btn btn-outline-primary mt-4 bg-theme-light dark:bg-darkmode-theme-light dark:text-darkmode-text border-black text-dark rounded-lg"
        href={`/${blog_folder}/${post.slug}`}
      >
        Leia mais
      </Link>

    </div>
  );
};

export default Post;
