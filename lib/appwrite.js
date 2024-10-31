import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appWriteConfig = {
  projectId: "6720c3d8002763155de5",
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.azeez.aora",
  databaseId: "6720c63c00166008958e",
  userCollectionId: "6720c6800018ee902c93",
  videosCollectionId: "6720c6c50007b642a987",
  storageId: "6720c86b003e2125ff80",
};

export const client = new Client()
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, name) => {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    if (!response) return new Error("Failed to create user");
    const avatarUrl = avatars.getInitials(name);
    await signIn(email, password);

    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: response.$id,
        email,
        avatar: avatarUrl,
        username: name,
      }
    );
    if (!newUser) return new Error("Failed to create user");
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const response = await account.get();
    if (!response) return new Error("Failed to get user");
    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", response.$id)]
    );
    if (!currentUser) return new Error("Failed to get user");
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function signOut() {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getAllPosts() {
  try {
    const response = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    if (!response) return new Error("Failed to get posts");
    return response.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getLatestPosts() {
  try {
    const response = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    if (!response) return new Error("Failed to get posts");
    return response.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function searchPosts(query) {
  try {
    const response = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      [Query.search("title", query)]
    );
    if (!response) return new Error("Failed to get posts");
    return response.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getPostsByUser(userId) {
  try {
    const response = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );
    if (!response) return new Error("Failed to get posts");
    return response.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getFilePreview(fileId, type) {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appWriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appWriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid type");
    }
    if (!fileUrl) return new Error("Failed to get file");
    return fileUrl;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function uploadFile(file, type) {
  if (!file) return;
  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };
  try {
    const response = await storage.createFile(
      appWriteConfig.storageId,
      ID.unique(),
      asset
    );
    if (!response) return new Error("Failed to upload file");
    const fileUrl = await getFilePreview(response.$id, type);
    return fileUrl;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function createPost(form) {
  try {
    const [videoUrl, thumbnailUrl] = await Promise.all([
      uploadFile(form.video, "video"),
      uploadFile(form.image, "image"),
    ]);
    const newPost = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      ID.unique(),
      {
        title: form.title,
        prompt: form.prompt,
        creator: form.userId,
        video: videoUrl,
        thumbnail: thumbnailUrl,
      }
    );
    if (!newPost) return new Error("Failed to create post");
    return newPost;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function savePost(postId, user) {
  try {
    // Get the post document
    const post = await databases.getDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      postId
    );

    if (!post) throw new Error("Failed to get post");

    // Check if the user is already in the post's users array
    const userExists = post.users?.some((u) => u.accountId === user.accountId);

    // Add user only if they don’t already exist in the array
    const updatedUsers = userExists ? post.users : [...post.users, user];

    // Update the document with the new users array
    const updatedPost = await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      postId,
      {
        users: updatedUsers,
      }
    );

    if (!updatedPost) throw new Error("Failed to update post");
    return updatedPost;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getUserSavedPosts(accountId) {
  try {
    // Retrieve all posts (consider adding a limit for performance)
    const response = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId
    );

    if (!response) throw new Error("Failed to get posts");
    // Filter posts to find those that contain the user with the given accountId in `users` array
    const userSavedPosts = response.documents.filter(
      (post) => post.users && post.users.some((u) => u.$id === accountId)
    );

    return userSavedPosts;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
