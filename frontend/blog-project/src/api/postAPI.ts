// // export interface CreatePostDto {
// //     userId: number;
// //     content: string;

// // }

// // export interface Comment {
// //     id: number;
// //     author: string;
// //     content: string;
// // }

// // export interface Post {
// //     id: number;
// //     userId: number;
// //     content: string;
// //     createdAt: string;
// //     likes: number;
// //     shares: number;
// //     comments: Comment[];
// //     image?: string; // thêm image
// //     emoji?: string;
// // }

// // const BASE_URL = "http://localhost:3000";

// // /* ===== Lấy danh sách bài viết ===== */
// // export async function getPosts(): Promise<Post[]> {
// //     const response = await fetch(`${BASE_URL}/posts`);
// //     const data = await response.json();
// //     if (!response.ok) throw new Error(data.message || "Lấy bài viết thất bại");
// //     return data;
// // }

// // /* ===== Tạo bài viết mới ===== */
// // export async function createPost(data: CreatePostDto, file?: File): Promise<Post> {
// //     const formData = new FormData();
// //     formData.append("userId", data.userId.toString());
// //     formData.append("content", data.content);

// //     if (file) {
// //         formData.append("image", file); // file sẽ được gửi dạng multipart/form-data
// //     }

// //     const response = await fetch(`${BASE_URL}/posts`, {
// //         method: "POST",
// //         body: formData, // lưu ý không cần headers Content-Type, browser tự set
// //     });

// //     const dataRes = await response.json();
// //     if (!response.ok) throw new Error(dataRes.message || "Tạo bài viết thất bại");
// //     return dataRes;
// // }


// // /* ===== Thích bài viết ===== */
// // export async function likePost(postId: number): Promise<{ likes: number }> {
// //     const response = await fetch(`${BASE_URL}/posts/${postId}/like`, { method: "POST" });
// //     const data = await response.json();
// //     if (!response.ok) throw new Error(data.message || "Thích bài viết thất bại");
// //     return data;
// // }

// // /* ===== Thêm bình luận ===== */
// // export async function commentPost(postId: number, author: string, content: string): Promise<Comment> {
// //     const response = await fetch(`${BASE_URL}/posts/${postId}/comment`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ author, content }),
// //     });
// //     const data = await response.json();
// //     if (!response.ok) throw new Error(data.message || "Thêm bình luận thất bại");
// //     return data;
// // }



// export interface CreatePostDto {
//     userId: number;
//     content: string;
// }

// export interface Post {
//     id: number;
//     userId: number;
//     content: string;
//     createdAt: string;
//     image?: string;
//     emoji?: string;
//     comments?: Comment[];
//     likes?: number;
//     shares?: number;
// }

// export interface Comment {
//     id: number;
//     author: string;
//     content: string;
//     createdAt: string;
// }

// interface CommentInput {
//     author: string;
//     content: string;
// }

// const BASE_URL = "http://localhost:3000";

// /* ===== Lấy danh sách bài viết ===== */
// export async function getPosts(): Promise<Post[]> {
//     const response = await fetch(`${BASE_URL}/posts`);
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || "Lấy bài viết thất bại");
//     return data;
// }

// /* ===== Tạo bài viết mới ===== */
// export async function createPost(
//     data: CreatePostDto,
//     file?: File,
//     emoji?: string
// ): Promise<Post> {
//     const formData = new FormData();
//     formData.append("userId", data.userId.toString());
//     formData.append("content", data.content);
//     if (file) formData.append("image", file);
//     if (emoji) formData.append("emoji", emoji);

//     const response = await fetch(`${BASE_URL}/posts`, {
//         method: "POST",
//         body: formData,
//     });

//     const dataRes = await response.json();
//     if (!response.ok) throw new Error(dataRes.message || "Tạo bài viết thất bại");
//     return dataRes;
// }

// /* ===== Thêm bình luận ===== */
// export async function commentPost(
//     postId: number,
//     author: string,
//     content: string
// ): Promise<Comment> {
//     const response = await fetch(`${BASE_URL}/posts/${postId}/comment`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ author, content }),
//     });

//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || "Thêm bình luận thất bại");
//     return data;
// }

// /* ===== Lấy bình luận ===== */
// export async function getComments(postId: number): Promise<Comment[]> {
//     const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || "Lấy bình luận thất bại");
//     return data;
// }


export interface CreatePostDto {
    userId: number;
    content: string;
}

export interface Comment {
    id: number;
    author: string;
    content: string;
    createdAt: string;
}

export interface Post {
    id: number;
    userId: number;
    content: string;
    createdAt: string;
    image?: string;
    emoji?: string;
    comments?: Comment[];
    likes?: number;
    shares?: number;
}

const BASE_URL = "http://localhost:3000";

export async function getPosts(): Promise<Post[]> {
    const response = await fetch(`${BASE_URL}/posts`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Lấy bài viết thất bại");
    return data;
}

export async function createPost(data: CreatePostDto, file?: File, emoji?: string): Promise<Post> {
    const formData = new FormData();
    formData.append("userId", data.userId.toString());
    formData.append("content", data.content);
    if (file) formData.append("image", file);
    if (emoji) formData.append("emoji", emoji);

    const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        body: formData,
    });

    const dataRes = await response.json();
    if (!response.ok) throw new Error(dataRes.message || "Tạo bài viết thất bại");
    return dataRes;
}

/* ===== Chỉnh sửa bài viết ===== */
export async function editPost(postId: number, content?: string, file?: File, emoji?: string)
    : Promise<Post> {
    const formData = new FormData();
    if (content !== undefined) formData.append("content", content); // content phải là string
    if (file) formData.append("image", file);
    if (emoji) formData.append("emoji", emoji);

    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "PUT",
        body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Chỉnh sửa bài viết thất bại");
    return data;
}


/* ===== Xóa bài viết ===== */
export async function deletePost(postId: number)
    : Promise<{ message: string; post: Post }> {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Xóa bài viết thất bại");
    return data;
}

/* ===== Thích bài viết ===== */
export async function likePost(postId: number): Promise<{ likes: number }> {
    const response = await fetch(`${BASE_URL}/posts/${postId}/like`, { method: "POST" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Thích bài viết thất bại");
    return data;
}


export async function commentPost(postId: number, author: string, content: string)
    : Promise<Comment> {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, { // sửa lại 'comments'
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, content }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Thêm bình luận thất bại");
    return data;
}


export async function getComments(postId: number): Promise<Comment[]> {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Lấy bình luận thất bại");
    return data;
}
