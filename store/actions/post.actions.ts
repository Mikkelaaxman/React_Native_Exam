import Post from "../../entities/Post"; //Gets imported without {} since its default export
import Comment from "../../components/Comment";
export const FETCH_POSTS = "FETCH_POSTS";
export const ADD_POST = "ADD_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const LIKE_COMMENT = "LIKE_COMMENT";
export const DISLIKE_COMMENT = "DISLIKE_COMMENT";
export const DELETE_POST = "DELETE_POST";

export const fetchPosts = () => {
  return async (dispatch: any, getState: any) => {
    const token = getState().user.idToken;
    console.log("userID" + token.localId);

    // const userId = "u1";
    try {
      // async. All users allowed to read.
      const response = await fetch(
        "https://reactproject-a0334-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
      ); //URL to posts
      console.log(response);
      if (!response.ok) {
        const errorResponseData = await response.json();
        const errorId = errorResponseData.error.message;
        let message = "Something went wrong";

        console.log(message);

        throw new Error(message);
      }
      const responseData = await response.json();
      const loadedPosts = [];
      console.log("fetching posts: " + responseData);

      for (const key in responseData) {
        const obj = responseData[key];

        loadedPosts.push(
          new Post(
            obj.id,
            obj.authorName,
            obj.authorImageUrl,
            obj.title,
            new Date(obj.date),
            obj.body,
            obj.category,
            obj.imageUrl,
            obj.likes,
            obj.comments
            
          )
        );
        console.log("Loaded Post added: " + obj.title);

      }
      dispatch({ type: FETCH_POSTS, posts: loadedPosts });
    } catch (error) {
      throw error;
    }
  };
};

export const addComment = (newComment: any, postId: string) => {
  return async (dispatch: any, getState: any) => {
    try {
      // get all posts from the state
      const posts = getState().posts.posts;

      // find post we are editing, get comments array and add a new comment to it
      const post = posts.find((post: any) => post.id == postId);
      post.comments.push(newComment);
      const jComments = JSON.stringify({ comments: post.comments });

      const response = await fetch(
        `https://reactproject-a0334-default-rtdb.europe-west1.firebasedatabase.app/posts/${postId}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: jComments,
        }
      );
      if (!response.ok) {
        const errorResponseData = await response.json();
        const errorId = errorResponseData.error.message;
        let message = "Something went wrong";

        console.log("response is not ok");
        throw new Error(message);
      }
      // dispatch({ type: ADD_COMMENT, newComment: newComment, postId: postId });
    } catch (error) {
      throw error;
    }
  };
};

export const likeComment = (
  userId: string,
  commentId: string,
  postId: string
) => {
  return async (dispatch: any, getState: any) => {
    try {
      // get all posts from the state
      const posts = getState().posts.posts;

      // find post we are editing, get comments array and add the new like
      const post = posts.find((post: Post) => post.id == postId);
      const comments = post.comments;
      const index = comments.findIndex(
        (comment: Comment) => comments.id == commentId
      );

      if (Array.isArray(comments[index].likes)) {
        comments[index].likes.push(userId);
      } else {
        comments[index].likes = [userId];
      }

      const jComments = JSON.stringify({ comments: comments });

      const response = await fetch(
        `https://reactproject-a0334-default-rtdb.europe-west1.firebasedatabase.app/posts/${postId}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: jComments,
        }
      );
      if (!response.ok) {
        const errorResponseData = await response.json();
        const errorId = errorResponseData.error.message;
        let message = "Something went wrong";

        console.log("response is not ok");
        throw new Error(message);
      }
      dispatch({ type: LIKE_COMMENT, commentId: commentId, postId: postId });
    } catch (error) {
      throw error;
    }
  };
};

export const dislikeComment = (
  userId: string,
  commentId: string,
  postId: string
) => {
  return async (dispatch: any, getState: any) => {
    try {
      // get all posts from the state
      const posts = getState().posts.posts;

      // find post we are editing, get comments array and remove user's like
      const post = posts.find((post: any) => post.id == postId);
      const comments = post.comments;
      const commentIndex = comments.findIndex(
        (comment: any) => comment.id == commentId
      );
      const likeIndex = comments[commentIndex].likes.indexOf(userId);
      const newComment = comments[commentIndex].likes.splice(likeIndex, 1);

      const jComments = JSON.stringify({ comments: comments });

      const response = await fetch(
        `https://reactproject-a0334-default-rtdb.europe-west1.firebasedatabase.app/posts/${postId}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: jComments,
        }
      );
      if (!response.ok) {
        const errorResponseData = await response.json();
        const errorId = errorResponseData.error.message;
        let message = "Something went wrong";

        console.log("response is not ok");
        throw new Error(message);
      }
      dispatch({
        type: DISLIKE_COMMENT,
        newComment: newComment,
        postId: postId,
      });
    } catch (error) {
      throw error;
    }
  };
};
export const deletePost = (id: string) => {
  return async (dispatch: any, state: any) => {
    // const userId = "u1";
    try {
      // async
      const response = await fetch(
        "https://reactproject-a0334-default-rtdb.europe-west1.firebasedatabase.app/posts"
      ); //URL to posts
      if (!response.ok) {
        const errorResponseData = await response.json();
        const errorId = errorResponseData.error.message;
        let message = "Something went wrong";

        console.log(errorId);

        throw new Error(message);
      }
      const responseData = await response.json();
      const loadedPosts = [];

      for (const key in responseData) {
        loadedPosts.push(
          new Post(
            key,
            responseData[key].authorName,
            responseData[key].authorImageUrl,
            responseData[key].title,
            new Date(responseData[key].date),
            responseData[key].body,
            responseData[key].category,
            responseData[key].imageUrl,
            responseData[key].likes,
            responseData[key].comments
          )
        );
      }

      dispatch({ type: DELETE_POST, payload: loadedPosts });
    } catch (error) {
      throw error;
    }
  };
};

export const addPost = (post: Post) => {
  return async (dispatch: any, state: any) => {
    //create new post from input
    //send post to be pushed to state
  };
};
