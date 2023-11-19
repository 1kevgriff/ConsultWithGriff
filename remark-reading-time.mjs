import readingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export default function remarkReadingTime() {
    return (tree, {data}) => {
        const { text } = toString(tree);
        const readingTime = readingTime(text);

        console.log(`Reading time for ${data.astro.frontmatter.title}: ${readingTime.text}` );
        data.astro.frontmatter.readingTime = readingTime;
    };
}