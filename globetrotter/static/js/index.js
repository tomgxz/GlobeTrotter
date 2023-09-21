
// GET PAGES

$.getJSON("/get/locations", data => {
  const pages = data.pages

  const circles = $(".rotation-circle"),
    pageTitle = $("#page-wrapper .page-title-wrapper .page-title"),
    pageSubtitle = $("#page-wrapper .page-title-wrapper .page-subtitle"),
    animTF = 1.5,
    animStaggerAmt = .12,
    animEase = "power3.inOut",
    animScaleOG = 1,
    animScaleFrom = [4, 6, 8],
    animScaleTo = [1.5, 2, 4],
    animRotFrom = 0,
    animRotTo = 270

  var currentPage = 0,
    anim_running = false


  // FUNCTION FOR ADDING ELEMENTS OF THE NEXT PAGE BEFORE THE ANIMATION

  const loadNextPage = page => {

    circles.each(function () {
      $(this).append(
        $("<div/>")
          .addClass("image-container")
          .addClass("next")
          .append(
            $("<img/>")
              .attr("src", page.image)
          )
      )
    })

    pageTitle.append(
      $("<h1/>")
        .addClass("next")
        .html("&nbsp;" + page.title)
        .css({ position: "absolute" })
    )

    pageSubtitle.append(
      $("<h2/>")
        .addClass("next")
        .html("&nbsp;" + page.subtitle)
        .css({ position: "absolute" })
    )

  }

  // ANIMATION FUNCTION

  const animToNextPage = (invert = false) => {

    const currentCircles = $(".rotation-circle .image-container.active"),
      nextCircles = $(".rotation-circle .image-container.next"),
      currentTitle = pageTitle.children("h1.active").eq(0),
      nextTitle = pageTitle.children("h1.next").eq(0),
      currentSubtitle = pageSubtitle.children("h2.active").eq(0),
      nextSubtitle = pageSubtitle.children("h2.next").eq(0)

    var localRot = animRotTo,
      iter

    if (invert) localRot = -localRot

    // CIRCLE ANIMATIONS

    gsap.set(currentCircles, { scale: animScaleOG, rotation: animRotFrom, opacity: 1 })
    gsap.set(nextCircles, { opacity: 0 })

    iter = currentCircles.length - 1
    currentCircles.each(function () {
      gsap.to(this, { scale: animScaleTo[iter], rotation: localRot, duration: animTF, ease: animEase, delay: iter * animStaggerAmt })
      gsap.set(this, { opacity: 0, delay: (iter * animStaggerAmt) + animTF })
      iter--
    })

    iter = nextCircles.length - 1
    nextCircles.each(function () {
      gsap.set(this, { scale: animScaleFrom[iter], rotation: -localRot })

      gsap.to(this, { scale: animScaleOG, rotation: animRotFrom, duration: animTF, ease: animEase, delay: iter * animStaggerAmt })
      gsap.to(this, { opacity: 1, duration: animTF / 4, ease: animEase, delay: (iter * animStaggerAmt) + animTF / 4 })
      iter--
    })

    setTimeout(() => {
      nextCircles.removeClass("next")
      nextCircles.addClass("active")
      currentCircles.remove()

      anim_running = false
    }, (animTF + (nextCircles.length - 1) * animStaggerAmt) * 1000)

    // TEXT ANIMATIONS

    gsap.to(currentTitle, { top: -currentTitle.innerHeight(), duration: animTF / 2, delay: animTF / 3, ease: animEase })
    gsap.to(nextTitle, {
      top: 0, duration: animTF / 2, delay: animTF / 3, ease: animEase, onComplete() {
        currentTitle.remove()
        nextTitle
          .css({ position: "relative", top: 0 })
          .removeClass("next")
          .addClass("active")
      }
    })

    nextSubtitle.css({ top: -currentSubtitle.innerHeight() })

    gsap.to(currentSubtitle, { top: currentSubtitle.innerHeight(), duration: animTF / 2, delay: animTF / 3, ease: animEase })
    gsap.to(nextSubtitle, {
      top: 0, duration: animTF / 2, delay: animTF / 3, ease: animEase, onComplete() {
        currentSubtitle.remove()
        nextSubtitle
          .css({ position: "relative", top: 0 })
          .removeClass("next")
          .addClass("active")
      }
    })

  }

  $("#page-selector-prev").click(() => {
    if (anim_running) return
    anim_running = true

    currentPage--
    if (currentPage < 0) currentPage = pages.length - 1

    loadNextPage(pages[currentPage])

    animToNextPage(invert = true)
  })

  $("#page-selector-next").click(() => {
    if (anim_running) return
    anim_running = true

    currentPage++
    if (currentPage == pages.length) currentPage = 0
    loadNextPage(pages[currentPage])

    animToNextPage()
  })

  $("#page-selector-random").click(() => {
    if (anim_running) return
    anim_running = true

    let old = currentPage

    while (currentPage == old) currentPage = Math.floor(Math.random() * pages.length)
    loadNextPage(pages[currentPage])

    animToNextPage()
  })


  // PRELOAD BACKROUND IMAGES

  for (var page of pages) {
    $(document.head).append(
      $("<link/>")
        .attr("rel", "preload")
        .attr("as", "image")
        .attr("href", page.image)
    )
  }


  // CREATE THE FIRST PAGE

  circles.each(function () {
    $(this).append(
      $("<div/>")
        .addClass("image-container")
        .addClass("active")
        .append(
          $("<img/>")
            .attr("src", pages[currentPage].image)
        )
    )
  })

  pageTitle.append(
    $("<h1/>")
      .addClass("active")
      .html("&nbsp;" + pages[currentPage].title)
  )

  pageSubtitle.append(
    $("<h2/>")
      .addClass("active")
      .html("&nbsp;" + pages[currentPage].subtitle)
  )


})
