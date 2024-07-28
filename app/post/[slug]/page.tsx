import SinglePost from "@/components/single-post"
import FeedPost from "@/components/feed-post"

import { notFound } from "next/navigation"

import { singlePostQuery } from "@/db/queries/singlePost"
import { postResponsesQuery } from "@/db/queries/postsFeed"
import { mightFail } from "might-fail"

export const runtime = 'edge';

export default async function Post({ params }: { params: { slug: string } }) {
  const slug = params.slug

  const { result: post, error: getPostError } = await mightFail(
    singlePostQuery.execute({ slug }).then((result) => result[0])
  )
  if (getPostError) {
    console.error(getPostError)
    return <div>error connecting to database</div>
  }
  if (!post) {
    notFound()
  }

  const { result: postResponses, error: getPostResponsesError } = await mightFail(
    postResponsesQuery.execute({ slug })
  )

  if (getPostResponsesError) {
    console.error(getPostError)
    return <div>error connecting to database</div>
  }
  if (!postResponses) {
    notFound()
  }

  return (
    <div className="flex flex-col divide-y">
      <SinglePost post={post} />
      {postResponses.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  )
}
