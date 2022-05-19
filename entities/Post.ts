//I chose to make this component the old-school model way, for visibility. 
class Post {
    id: string;
    authorName: string;
    authorImageUrl: string;
    title: string;
    date: Date;
    body: string;
    category: string;
    imageUrl: string;
    likes: number;
    comments: [Comment];

    constructor(id: string, authorName: string, authorImageUrl: string, title: string, date: Date, body: string, category: string, imageUrl: string, likes: number, comments: [Comment]) {
        this.id = id;
        this.authorName = authorName;
        this.authorImageUrl = authorImageUrl;
        this.title = title;
        this.date = date;
        this.body = body;
        this.category = category;
        this.imageUrl = imageUrl;
        this.likes = likes;
        this.comments = comments;
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