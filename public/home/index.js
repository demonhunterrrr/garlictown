function sound(sound_effect, img_url) {
    garlic = new Audio(sound_effect);
    garlic.play();
    document.body.style.backgroundImage = `url(${img_url})`;
}
