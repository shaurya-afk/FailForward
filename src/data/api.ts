import { Story } from "@/types/story";
import { StoryRequest, StoryResponse } from "@/types/story";

const BASE_URL = "https://failforward-backend.onrender.com";

class ApiError extends Error{
    status: number;
    constructor(message: string, status: number){
        super(message);
        this.status = status;
    }
}

export async function checkHealth(): Promise<boolean> {
    try {
        const res = await fetch(`${BASE_URL}/actuator/health`);
        if (!res.ok) return false;
        const data = await res.json();
        return data.status === "UP";
    } catch (e) {
        return false;
    }
}

export async function getAllStories(): Promise<Story[]>{
    try {
        const res = await fetch(`${BASE_URL}/api/stories`);
        if(!res.ok){
            if(res.status === 500) throw new ApiError('Server issue. Please try again later.', 500);
            throw new ApiError('Failed to fetch stories. ', res.status);
        }
        return res.json();
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new ApiError('Network error: Unable to connect to the server. Please check your internet connection.', 0);
        }
        throw error;
    }
}

export async function addStory(story:StoryRequest): Promise<StoryResponse> {
    try {
        const res = await fetch(`${BASE_URL}/api/stories`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(story),
        });
        if(!res.ok){
            if(res.status === 500) throw new ApiError('Server issue. Please try again later.', 500);
            throw new ApiError('Failed to add story. ', res.status);
        }
        return res.json();
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new ApiError('Network error: Unable to connect to the server. Please check your internet connection.', 0);
        }
        throw error;
    }
}

export async function deleteStory(id:number): Promise<void> {
    try {
        const res = await fetch(`${BASE_URL}/api/stories/${id}`,{
            method: 'DELETE',
        });
        if(!res.ok){
            if(res.status === 500) throw new ApiError('Server issue. Please try again later.', 500);
            if(res.status === 404) throw new ApiError('Story not found.', 404);
            throw new ApiError('Failed to delete story. ', res.status);
        }
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new ApiError('Network error: Unable to connect to the server. Please check your internet connection.', 0);
        }
        throw error;
    }
}

export async function getStoriesByUserId(userId:string): Promise<Story[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/stories/mystories/${userId}`);
        if(!res.ok){
            if(res.status === 500) throw new ApiError('Server issue. Please try again later.', 500);
            if(res.status === 404) throw new ApiError('User not found.', 404);
            throw new ApiError('Failed to fetch stories. ', res.status);
        }
        return res.json();
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new ApiError('Network error: Unable to connect to the server. Please check your internet connection.', 0);
        }
        throw error;
    }
}

export async function updateUpVotesCount(id:number, newCount:number): Promise<Story> {
    try {
        const res = await fetch(`${BASE_URL}/api/stories/updateupvotes/${newCount}/${id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'}
        });
        if(!res.ok){
            if(res.status === 500) throw new ApiError('Server issue. Please try again later.', 500);
            if(res.status === 404) throw new ApiError('Story not found.', 404);
            throw new ApiError('Failed to update upvotes. ', res.status);
        }
        return res.json();
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new ApiError('Network error: Unable to connect to the server. Please check your internet connection.', 0);
        }
        throw error;
    }
}

export async function likeStory(storyId: number, userId: string): Promise<Story> {
    try {
        console.log(`Making like request for story ${storyId} and user ${userId}`);
        const res = await fetch(`${BASE_URL}/api/stories/${storyId}/like?userId=${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        console.log(`Like response status: ${res.status}`);
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error(`Like request failed with status ${res.status}:`, errorText);
            throw new ApiError(`Failed to like story. Status: ${res.status}`, res.status);
        }
        
        const updatedStory = await res.json();
        console.log('Like response:', updatedStory);
        
        return updatedStory;
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new ApiError('Network error: Unable to connect to the server. Please check your internet connection.', 0);
        }
        throw error;
    }
}

export async function unlikeStory(storyId: number, userId: string): Promise<Story> {
    try {
        console.log(`Making unlike request for story ${storyId} and user ${userId}`);
        const res = await fetch(`${BASE_URL}/api/stories/${storyId}/unlike?userId=${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        console.log(`Unlike response status: ${res.status}`);
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error(`Unlike request failed with status ${res.status}:`, errorText);
            throw new ApiError(`Failed to unlike story. Status: ${res.status}`, res.status);
        }
        
        const updatedStory = await res.json();
        console.log('Unlike response:', updatedStory);
        
        return updatedStory;
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new ApiError('Network error: Unable to connect to the server. Please check your internet connection.', 0);
        }
        throw error;
    }
}

export async function hasUserLiked(storyId: number, userId: string): Promise<boolean> {
    try {
        const res = await fetch(`${BASE_URL}/api/stories/${storyId}/liked?userId=${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new ApiError('Failed to check like status.', res.status);
        return res.json() as Promise<boolean>;
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new ApiError('Network error: Unable to connect to the server. Please check your internet connection.', 0);
        }
        throw error;
    }
}

/**
 * Get accurate like count for a story from the database
 * This ensures consistency by counting actual likes
 */
export async function getAccurateLikeCount(storyId: number): Promise<number> {
    try {
        const res = await fetch(`${BASE_URL}/api/stories/${storyId}/accurate-like-count`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new ApiError('Failed to get accurate like count.', res.status);
        return res.json() as Promise<number>;
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new ApiError('Network error: Unable to connect to the server. Please check your internet connection.', 0);
        }
        throw error;
    }
}

// Comment API functions
export async function addComment(commentRequest: {
    storyId: number;
    userId: string;
    commenterName?: string;
    isAnonymous: boolean;
    content: string;
}): Promise<any> {
    try {
        const res = await fetch(`${BASE_URL}/api/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentRequest),
        });
        
        if (!res.ok) {
            const errorText = await res.text();
            throw new ApiError(`Failed to add comment. Status: ${res.status}`, res.status);
        }
        
        return res.json();
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new ApiError('Network error: Unable to connect to the server. Please check your internet connection.', 0);
        }
        throw error;
    }
}

export async function getCommentsByStoryId(storyId: number): Promise<any[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/comments/story/${storyId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!res.ok) {
            throw new ApiError('Failed to fetch comments.', res.status);
        }
        
        return res.json();
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new ApiError('Network error: Unable to connect to the server. Please check your internet connection.', 0);
        }
        throw error;
    }
}

export async function deleteComment(commentId: number, userId: string): Promise<boolean> {
    try {
        const res = await fetch(`${BASE_URL}/api/comments/${commentId}?userId=${userId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!res.ok) {
            throw new ApiError('Failed to delete comment.', res.status);
        }
        
        return true;
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new ApiError('Network error: Unable to connect to the server. Please check your internet connection.', 0);
        }
        throw error;
    }
}

export async function getCommentCount(storyId: number): Promise<number> {
    try {
        const res = await fetch(`${BASE_URL}/api/comments/count/${storyId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!res.ok) {
            throw new ApiError('Failed to get comment count.', res.status);
        }
        
        return res.json();
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new ApiError('Network error: Unable to connect to the server. Please check your internet connection.', 0);
        }
        throw error;
    }
}

// Helper function to get updated story data after like/unlike
export async function getStoryById(storyId: number): Promise<Story | null> {
    try {
        const allStories = await getAllStories();
        return allStories.find(story => story.id === storyId) || null;
    } catch (error) {
        console.error('Error fetching story by ID:', error);
        return null;
    }
}