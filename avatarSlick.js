$(document).ready(function(){
      const avatarSlick = (function () {
            const init = () => {
                  const container = $('.slider').slick({
                        variableWidth: true,
                        infinite: true,
                        arrows: false,
                        centerMode: true,
                        swipeToSlide: true,
                        speed: 300,
                        initialSlide: 3,
                        slideToShow: 5,
                        adaptiveHeight: true,
                        touchThreshold : 20
                  })
                  const model = {
                        prevSlide: 0,
                        beforeActive: 0,
                        diffActive: 0,
                        isDragging: false,
                        isCloned: false

                  }
                  
                  const containerController = {
                        getActiveState : ()=>container.hasClass("is--active")
                  }
                  
                  container.find('.slider__item img').on('click', (e) => {
                        if (model.isDragging) return
                        const target = $(e.target)
                        const slide = $(e.target).parents('.slider__item')
                        let index = getCurrentSlideIndex()
                        const isClickOnCurrentSlide = slide.hasClass("slick-current")
                        const isContainerActive = containerController.getActiveState()

                        if (isClickOnCurrentSlide) {
                              if (isContainerActive) {
                                    container.removeClass("is--active")
                                    if (model.isCloned) {
                                          if (model.diffActive >= 0) {
                                                console.log('slickPrev');
                                                container.slick('slickPrev')
                                          } else {
                                                console.log('slickNext');
                                                container.slick('slickNext')
                                          }
                                    } else {
                                          container.slick('slickGoTo', model.beforeActive)
                                    }

                              } else {
                                    container.addClass("is--active")
                                    changePage()
                              }
                        } else {
                              container.addClass("is--active")
                              changePage()
                        }

                        model.isCloned = slide.hasClass("slick-cloned")
                        function getCurrentSlideIndex() {
                              return slide.data("slick-index")
                        }
                        function changePage() {
                              if (index <= -2) {
                                    container.slick('slickPrev')

                              } else {
                                    container.slick('slickGoTo', index)
                              }
                        }


                  });
                  container.on("beforeChange", beforeChange)
                  container.on("afterChange", afterChange)
                  container.on('dragstart', setDraggingIsTrue);
                  $('body').on('mouseup', setDraggingIsFalseAfterClickEvent);
                  container.on('wheel', horizontalScroll);

                  function beforeChange(_, _, currentSlide, nextSlide) {
                        model.beforeActive = currentSlide
                        if (nextSlide !== model.prevSlide) {
                              container.find('.slider__text-container').removeClass("is--show")
                        }
                  }
                  function afterChange(_, _, currentSlide) {
                        model.diffActive = model.prevSlide - currentSlide
                        if (currentSlide !== model.prevSlide) {
                              container.find('.slick-current .slider__text-container').addClass("is--show")
                              model.prevSlide = currentSlide
                        } 
                  
                  }
                  function setDraggingIsTrue() {
                        model.isDragging = true
                        
                  }
                  function setDraggingIsFalseAfterClickEvent() {
                        setTimeout(() => {
                              model.isDragging = false
                        }, 0);
                        
                  }
                  function horizontalScroll(e) {
                        e.preventDefault();
                        if (e.originalEvent.deltaY < 0) {
                              container.slick('slickNext');
                        } else {
                              container.slick('slickPrev');
                        }

                  }
            }

            return {
                  init
            }
      })()
      avatarSlick.init()
 })
