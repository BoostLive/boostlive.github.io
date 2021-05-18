const second = 1000 // 1000 Milisecond
const minute = second * 60
const hour = minute * 60
const day = hour * 24

let eventTime = "Jul 20, 2021 00:00:00"
let countdown = new Date(eventTime).getTime()

let x = setInterval(function ()
{
    let now = new Date().getTime()
    let distance = countdown - now

    document.getElementById("days").innerText = Math.floor(distance / day)
    document.getElementById("hours").innerText = Math.floor( (distance % day) / hour)
    document.getElementById("minutes").innerText = Math.floor( (distance % hour) / minute )
    document.getElementById("seconds").innerText = Math.floor( (distance % minute) / second )

    // If date is reached
    if (distance < 0)
    {
        const headline = document.getElementById("headline")
        const countdownElement = document.getElementById("countdown")
        const content = document.getElementById("content")

        // Creates a paragraph
        const para = document.createElement("p");
        const textnode = document.createTextNode("Taqabbalallahu Minna wa minkum. Idul Adha adalah saat untuk merayakan semangatmu dalam berkurban, harapanmu pada ampunan, dan keteguhanmu dalam beriman. Selamat Hari Raya Idul Adha, mohon maaf lahir dan batin. Berkurbanlah sekecil apapun itu karena bukan Anda atau mereka yang memberi pahala melainkan Allah SWT.")
        para.appendChild(textnode)
        content.appendChild(para)

        countdownElement.style.display = "none"
        content.style.display = "flex"

        headline.innerText = "Selamat hari raya idul adha!"

        clearInterval(x)
    }
})