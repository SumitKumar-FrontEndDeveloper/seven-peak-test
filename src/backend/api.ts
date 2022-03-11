//Imports
import { STORY, STORIES, ERROR } from "./interface"
import Guardian from 'guardian-js';

if (!process.env.REACT_APP_NEWSAPIKEY) {
    throw new Error("No APIKey found. Please add APIKey in 'NEWSAPIKEY'");
}

// API
const guardian = new Guardian(process.env.REACT_APP_NEWSAPIKEY!, false);

// eslint-disable-next-line
export default {
    list: async function (page?: number, topic?: string, category?: string): Promise<STORIES | ERROR> {
        try {
            let res: any = await guardian.content.search(topic ? topic : "all", {
                "format": "json",
                "page": page ? page : "1",
                "page-size": "11",
                "order-by": category ? category : "newest",
                "show-elements": ["all"],
                "show-fields": ["headline", "body", "lastModified", "score", "standfirst", "shortUrl", "thumbnail", "byline", "publication", "internalPageCode", "productionOffice", "starRating"]
            });
            let body = JSON.parse(res.body)
            let sports: [STORY] = [] as any, news: [STORY] = [] as any
            body.response.results.forEach((element: STORY) => {
                if (element.pillarName === "Sport") {
                    sports.push(element)
                } else {
                    news.push(element)
                }
            });
            body.response.results = [...news, ...sports]
            return { error: false, data: body.response }
        } catch (error) {
            console.log(error)
            return {
                error: true,
                msg: "internal server error",
                obj: error
            }
        }
    },

    get: async function (id: string): Promise<STORIES | ERROR> {
        try {
            let res: any = await guardian.content.search("all", {
                "q": id,
                "format": "json",
                "page-size": "1",
                "order-by": "relevance",
                "show-elements": ["all"],
                "show-fields": ["headline", "body", "lastModified", "score", "standfirst", "shortUrl", "thumbnail", "byline", "publication", "internalPageCode", "productionOffice", "starRating"]
            });
            let body = JSON.parse(res.body)
            return { error: false, data: { ...body.response, result: body.response.results[0] } }
        } catch (error) {
            console.log(error)
            return {
                error: true,
                msg: "internal server error",
                obj: error
            }
        }
    },
}



