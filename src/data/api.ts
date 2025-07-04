import { Story } from "@/types/story";
import { StoryRequest, StoryResponse } from "@/types/story";

const BASE_URL = "http://localhost:8080/api/stories";

class ApiError extends Error{
    status: number;
    constructor(message: string, status: number){
        super(message);
        this.status = status;
    }
}

export async function checkHealth(): Promise<boolean> {
    try {
        const res = await fetch('http://localhost:8080/actuator/health');
        if (!res.ok) return false;
        const data = await res.json();
        return data.status === "UP";
    } catch (e) {
        return false;
    }
}

export async function getAllStories(): Promise<Story[]>{
    const res = await fetch(`${BASE_URL}`);
    if(!res.ok){
        if(res.status === 500) throw new ApiError('Server issue. Please try again later.', 500);
        throw new ApiError('Failed to fetch stories. ', res.status);
    }
    return res.json();
}

export async function addStory(story:StoryRequest): Promise<StoryResponse> {
    const res = await fetch(`${BASE_URL}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(story),
    });
    if(!res.ok){
        if(res.status === 500) throw new ApiError('Server issue. Please try again later.', 500);
        throw new ApiError('Failed to fetch stories. ', res.status);
    }
    return res.json();
}

export async function deleteStory(id:number): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`,{
        method: 'DELETE',
    });
    if(!res.ok){
        if(res.status === 500) throw new ApiError('Server issue. Please try again later.', 500);
        if(res.status === 404) throw new ApiError('User not found.', 404);
        throw new ApiError('Failed to fetch stories. ', res.status);
    }
}

export async function getStoriesByUserId(userId:string): Promise<Story[]> {
    const res = await fetch(`${BASE_URL}/mystories/${userId}`);
    if(!res.ok){
        if(res.status === 500) throw new ApiError('Server issue. Please try again later.', 500);
        if(res.status === 404) throw new ApiError('User not found.', 404);
        throw new ApiError('Failed to fetch stories. ', res.status);
    }
    return res.json();
}

export async function updateUpVotesCount(id:number, newCount:number): Promise<Story> {
    const res = await fetch(`${BASE_URL}/updateupvotes/${newCount}/${id}`,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'}
    });
    if(!res.ok){
        if(res.status === 500) throw new ApiError('Server issue. Please try again later.', 500);
        if(res.status === 404) throw new ApiError('User not found.', 404);
        throw new ApiError('Failed to fetch stories. ', res.status);
    }
    return res.json();
}

export async function likeStory(storyId: number, userId: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/${storyId}/like?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new ApiError('Failed to like story.', res.status);
}

export async function unlikeStory(storyId: number, userId: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/${storyId}/unlike?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new ApiError('Failed to unlike story.', res.status);
}

export async function hasUserLiked(storyId: number, userId: string): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/${storyId}/liked?userId=${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new ApiError('Failed to check like status.', res.status);
    return res.json() as Promise<boolean>;
}