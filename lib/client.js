import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// next-app connecting with sanity...
export const client = sanityClient({
    projectId: 'oh7w6w37',
    dataset: 'production',
    apiVersion: '2022-04-23',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

// sanity give us access to the url where are images store...
const builder = imageUrlBuilder(client);

export const urlFor = source => builder.image(source);