class Post {
  authorName: string;
  authorImageUrl: string;
  title: string;
  date: Date;
  body: string;
  category: string;
  imageUrl: string;
  likes: number;
  comments: Comment;
  id?: string;

  constructor(
    authorImageUrl: string,
    authorName: string,
    body: string,
    category: string,
    comments: any,
    date: Date,
    imageUrl: string,
    likes: any,
    title: string,
    id: string
  ) {
      this.authorImageUrl = authorImageUrl;
      this.authorName = authorName;
      this.title = title;
      this.date = date;
      this.body = body;
      this.category = category;
      this.imageUrl = imageUrl;
      this.likes = likes;
      this.comments = comments;
      this.id = id;
    }

  get readableDate() {
    return this.date.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

//"Exporting without default means it's a "named export". 
//You can have multiple named exports in a single file"
export default Post;