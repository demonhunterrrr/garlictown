function sound(sound_effect, img_url) {
    garlic = new Audio('home/'+sound_effect);
    garlic.play();
    document.body.style.backgroundImage = `url(${'home/'+img_url})`;
}
