// Data Types
export interface STORY {
    apiUrl: string;
    fields: {
        headline: string;
        byline: string;
        thumbnail: string;
        body: string;
    }
    id: string;
    isHosted: boolean;
    pillarId: string;
    pillarName: string;
    sectionId: string;
    sectionName: string;
    type: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
}

// Return Types

export interface STORIES {
    error: false;
    data: [STORY];
}

export interface ERROR {
    error: true;
    msg: string;
    obj?: any;
}