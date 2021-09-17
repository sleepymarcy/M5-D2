# Strive Blog API

- [Documentation](https://documenter.getpostman.com/view/7356000/TzRYc4mk)

You are in charge of creating a set of WebAPIs for the Strive Blog application.

[Here](https://github.com/ubeytdemirr/strive-blog-template) you can find the Frontend already created

## Day 1
In this first "step" the application should enable the creation, editing, deletion, listing of blog authors.

- Authors should have following information:

```
name
surname
ID (Unique and server generated)
email
date of birth
avatar (e.g. https://ui-avatars.com/api/?name=John+Doe)

```

- The backend should include the following routes:

```
GET /authors => returns the list of authors
GET /authors/123 => returns a single author
POST /authors => create a new author
PUT /authors/123 => edit the author with the given id
DELETE /authors/123 => delete the author with the given id

```

## Day 2
In this second "step" the application should enable the creation, editing, deletion, listing of blog posts.

- Blog posts should contain the following information:
 
```
{	
"_id": "SERVER GENERATED ID",
"category": "ARTICLE CATEGORY",
"title": "ARTICLE TITLE",
"cover":"ARTICLE COVER (IMAGE LINK)",
"readTime": {
	"value": 2,
  "unit": "minute"
 },
"author": {
    "name": "AUTHOR AVATAR NAME",
    "avatar":"AUTHOR AVATAR LINK"
    },
 "content":"HTML",
 "createdAt": "NEW DATE"
}
 
```

- The backend should include the following routes:

```
GET /blogPosts => returns the list of blogposts
GET /blogPosts /123 => returns a single blogpost
POST /blogPosts => create a new blogpost
PUT /blogPosts /123 => edit the blogpost with the given id
DELETE /blogPosts /123 => delete the blogpost with the given id

```

Frontend

	Post article from new article form
	Fetch & List your articles at home page


## Day 3
In this third "step" the application should enable file uploading and comments crud.

Backend

Comments are going to be embedded in the corresponding blog post, so add a comments array on every post (empty at the beginning). They should contain just author name and text.

- The backend should include the following routes:

```
POST /authors/:id/uploadAvatar, uploads a picture (save as idOfTheAuthor.jpg in the public/img/authors folder) for the author specified by the id. Store the newly created URL into the corresponding author in authors.json
POST /blogPosts/:id/uploadCover, uploads a picture (save as idOfTheBlogPost.jpg in the public/img/blogPosts folder) for the blog post specified by the id. Store the newly created URL into the corresponding post in blogPosts.json
GET /blogPosts/:id/comments, get all the comments for a specific post
POST /blogPosts/:id/comments, add a new comment to the specific post

```

Frontend

	The user should be able to upload a picture as an avatar
	The user should be able to upload a picture as a blog post cover
