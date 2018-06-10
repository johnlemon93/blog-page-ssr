import fetch from 'node-fetch';
import { API_ROOT } from './api-config';

let cache = {};

function instantResolve(value) {
    return {
        then: (fn) => {
            return instantResolve(fn(value));
        }
    };
}

const postApi = {
    getPostLists() {
        const url = `${API_ROOT}/publish.json`;
        if (cache[url])
            return instantResolve(cache[url]);

        return fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    let ret = {
                        postLists: result.years.map(year => {
                            return {
                                year: year,
                                entries: result.published.filter(post => post.date.includes(year))
                            }
                        })
                    };
                    cache[url] = ret;
                    return ret;
                },
                (error) => {
                    return {
                        error: error
                    };
                }
            )
    },
    getPostContent(slug) {
        const postUrl = `${API_ROOT}/posts/${slug}.html`;
        if (cache[postUrl]) {
            return instantResolve(cache[postUrl]);
        }

        return fetch(postUrl)
            .then(res => res.text())
            .then(
                (result) => {
                    let ret = {
                        content: result
                    };

                    cache[postUrl] = ret;
                    return ret;
                },
                (error) => {
                    return {
                        error: error
                    };
                }
            );
    }
};

export default postApi;