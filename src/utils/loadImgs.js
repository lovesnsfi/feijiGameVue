import gameResource from "../../static/gameResource.json";
import { imgObj } from "./Container";

export default function loadImgs() {
    return new Promise((resolve, reject) => {
        var length = Object.keys(gameResource.images).length;
        var count = 0;
        for (var i in gameResource.images) {
            var img = new Image();
            img.src = gameResource.images[i];
            imgObj[i] = img;
            img.onload = () => {
                count++;
                if (count == length) {
                    resolve();
                }
            }
        }
    });
}