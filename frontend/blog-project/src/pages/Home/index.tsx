import { useEffect, useState } from "react";
import CreatePost from "../../core/components/blog/CreatePost";
import CreatePostPageModal from "../../core/components/blog/CreatePostPage";
import { PostCard } from "../../core/components/blog/PostCard";
import { Spin, message } from "antd";
import { getPosts, type Post } from "../../api/postAPI";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err: any) {
      message.error(err.message || "Lỗi khi tải bài viết");
    }
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setEditingPost(null);
    setShowModal(false);
  };

  if (loading) return <Spin tip="Đang tải bài viết..." />;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffe4e6" }}>
      <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        <CreatePost onPostCreated={fetchPosts} />

        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              postId={post.id}
              author={{
                name: `User ${post.userId}`,
                avatar: "/placeholder.svg",
                time: new Date(post.createdAt).toLocaleString(),
              }}
              content={post.content}
              likes={post.likes || 0}
              commentCount={post.comments?.length || 0}
              comments={post.comments || []}
              shares={post.shares || 0}
              image={post.image}
              emoji={post.emoji}
              onEdit={() => handleEdit(post)}
              onDelete={(id) => setPosts((prev) => prev.filter((p) => p.id !== id))}
            />
          ))}
        </div>

        <CreatePostPageModal
          visible={showModal}
          onClose={handleModalClose}
          postToEdit={editingPost}
          onPostCreated={fetchPosts}
        />
      </main>
    </div>
  );
}