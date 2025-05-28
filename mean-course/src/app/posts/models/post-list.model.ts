import {Post} from "./post.model";

export interface PostListResponse{
  message:string;
  posts: Post[];
}
