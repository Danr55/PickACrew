// TODO: Create an interface for the Candidate objects returned by the API

interface Candidate {
    id: number;
    login: string;         // Renamed from 'username' to 'login' to match GitHub API
    name?: string;        // Optional, as it may not always be present
    location?: string;    // Optional, as it may not always be present
    avatar_url: string;
    html_url: string;
    company?: string;     // Optional, as it may not always be present
    email?: string;       // Optional, as it may not always be present
}

export default Candidate;