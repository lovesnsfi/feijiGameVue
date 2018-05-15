import { imgObj } from "../utils/Container";
import gameResource from "../../static/gameResource.json";
/**
 * 播放死亡音乐
 */
export function playDieMusic() {
    let audio = document.createElement("audio");
    audio.src = gameResource.audio.enem0_down;
    audio.play();
}