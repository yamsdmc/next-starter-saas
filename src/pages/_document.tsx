// pages/_document.js

import Document, {Html, Head, Main, NextScript} from 'next/document';
import {MODAL_ROOT_ID} from "@/hooks/usePortal";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                <Main/>
                <div id={MODAL_ROOT_ID}></div>
                <NextScript/>
                </body>
            </Html>
        );
    }
}
