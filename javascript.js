//menu mobile 

const appear = document.querySelectorAll('.appear'); 

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
const header = document.querySelector('.header');

const cb = function(entries){
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('inview');
    }else{
      entry.target.classList.remove('inview');
    }
  });
}
const io = new IntersectionObserver(cb);
console.log(io);
console.log(appear);
for(let i =0 ;i< appear.length;i++){
    io.observe(appear[i]);
}



const isMobile = {
    Android: function(){
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
        }
    };
    if (isMobile.any()) {
        document.body.classList.add('_touch');

        // Rede more btn 
        const MoreText = document.querySelector('.event__info');

        const p = document.querySelector('.event__info p');
   
        const moreBtn = document.querySelector('.read-more');

        if (MoreText.offsetHeight > 200) {
            if(moreBtn) {
                moreBtn.style.display="block";
                moreBtn.addEventListener('click', function(e) {
                
                    if(MoreText.style.maxHeight) {
                        MoreText.style.maxHeight = null;
                        moreBtn.innerHTML = "reade more" ;
                    }
                    else {
                        MoreText.style.maxHeight = MoreText.scrollHeight + "px";
                        moreBtn.innerHTML = "reade less" ;
                    }
                });
            }
        }
        else {
            moreBtn.style.display="none"; 
        }
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener('click', function(e){
                mobileMenu.style.maxHeight = null;
            })
        });
     
    }
    else {
    document.body.classList.add('_pc');
    }

    const menuBody = document.querySelector('.header');
    const iconMenu = document.querySelector('.menu__icon');
    const mobileMenu = document.querySelector('.header__menu');
    if(iconMenu) {
        iconMenu.addEventListener('click', function(e) {
            document.body.classList.toggle('_lock');
            iconMenu.classList.toggle('_active');
            menuBody.classList.toggle('_active');
            
            if(mobileMenu.style.maxHeight) {
                mobileMenu.style.maxHeight = null;
            }
            else {
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
            }
        })
    }


// Sticky header

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if(!header.classList.contains('_active')) {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            header.classList.add('sticky');
          } else {
            header.classList.remove('sticky');
        }
    }
}

// scroll


if(menuLinks.length > 0 ) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
       const menuLink =  e.target;
       if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
          const gotoBlock = document.querySelector(menuLink.dataset.goto);
          const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;
          if(iconMenu.classList.contains('_active')){
             document.body.classList.remove('_lock');
             iconMenu.classList.remove('_active');
             menuBody.classList.remove('_active');
          }
       
           window.scrollTo({
               top:gotoBlockValue,
               behavior:'smooth'
           });
           e.preventDefault();
        }
    }

}
