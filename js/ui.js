// 브라우저 체크 함수
function browserVersionCheck(){
	var agent = navigator.userAgent.toLowerCase(),
		name = navigator.appName,
		browser;

	if( name === "Microsoft Internet Explorer" || agent.indexOf("trident") > -1 || agent.indexOf("edge/") > -1 ){
		browser = "ie";
		if( name === "Microsoft Internet Explorer" ){
			agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
            browser += parseInt(agent[1]);
		} else {
			if( agent.indexOf("trident") > -1 ){
				browser += 11;
			} else if( agent.indexOf("edge/") > -1 ){
				browser = "edge";
			}
		}
	} else if( agent.indexOf("safari") > -1 ){
		if( agent.indexOf("chrome") > -1 ){
			browser = "chrome";
		} else if( agent.indexOf("safari") > -1 ) {
			browser = "safari";
		}
	} else if( agent.indexOf("firefox") > -1 ){
		browser = "firefox";
	}

	return browser;
}

// Source Toggle
function sourceToggle(m){
	var sourceForm = $(".source")
	, sourceClose = sourceForm.find(".btn_close a")
	, sourcePre = sourceForm.find("pre")
	, sourceOldActive = null
	, sourceOldIndex = null;

	// 닫기버튼
	sourceClose.on("click", function(e){
		// 기본링크 기능삭제
		e.preventDefault();

		// 현재 Index 번호 확인
		var index = sourceClose.index(this);

		// 이전 클릭상태가 존재할경우
		if( sourceOldActive ){
			if( this === sourceOldActive && !$(sourceOldActive).hasClass("active") ){
				$(sourceOldActive).addClass("active");
				sourcePre.eq(sourceOldIndex).slideDown();
			} else {
				$(sourceOldActive).removeClass("active");
				sourcePre.eq(sourceOldIndex).slideUp();
			}
		}

		// 현재버튼 클릭과 이전 클릭과 다른경우
		if( this !== sourceOldActive ){
			$(this).addClass("active");
			sourcePre.eq(index).slideDown();

			sourceOldActive = this;
			sourceOldIndex = index;
		}
	});

	sourceClose.eq(m.active - 1).trigger("click");
}

// 테이블 리스트 전체체크박스
function listCheckAll(m){
    var allCheck = m.all
    , check = document.all(m.check);

	if( check ){
		if( allCheck.checked ){
			if( check.length ){
				for( var i=0; i<check.length; i++ ){
		            check[i].checked = true;
		        }
			} else {
				check.checked = true;
			}
	    } else {
			if( check.length ){
		        for( var i=0; i<check.length; i++ ){
		            check[i].checked = false;
		        }
			} else {
				check.checked = false;
			}
	    }
	}
}
// 테이블 리스트 체크박스
function listCheck(m){
    var allCheck = document.all(m.all)
    , check = document.all(m.check)
    , count = 0;

	if( check ){
		if( check.length ){
		    for( var i=0; i<check.length; i++ ){
		        if( check[i].checked ){
		            count++;
		        }
		    }
		} else {
			if( check.checked ){
				count++;
			}
		}

		if( check.length ){
		    if( count == check.length ){
		        allCheck.checked = true;
		    } else {
		        allCheck.checked = false;
		    }
		} else {
			if( count == 1 ){
		        allCheck.checked = true;
		    } else {
		        allCheck.checked = false;
		    }
		}
	}
}

// 셀렉트 활성화
function setSelectActive(m){
	// 검색 셀렉트박스 활성화
	var cateSelect = document.querySelector("select[name=" + m.name + "]")
	, cateSelectOpt = cateSelect.querySelectorAll("option")
	, initSelect = m.value;

	if( initSelect ){
	    for( var i=0; i<cateSelectOpt.length; i++ ){
	        if( cateSelectOpt[i].value == initSelect ){
	            cateSelectOpt[i].selected = true;
	        }
	    }
	}
}

/*
팝업창 사용법
<a target="_blank" href="#" onclick="popup({ url:http://www.ondisk.co.kr, name:'popup', width:300, height:300, position:'center', scroll:false });return false;">
<a target="_blank" href="http://www.ondisk.co.kr" onclick="popup({ url:this.href, name:'popup2', width:300, height:300, position:{ left:100, top:100 }, scroll:false });return false;">팝업2</a>
*/
function popup(obj){
	var url = obj.url
	, name = obj.name || "popup"
	, w = obj.width || 450
	, h = obj.height || 650
	, position = obj.position
	, scroll = obj.scroll
	, browserCheck = browserVersionCheck() || false
	, tlOpt = 'top=0, left=0';

	// 팝업 정렬
	if( position == "center" ){
		var top = screen.height/2 - h/2
		, left = null;

		// ie 일경우 top 값에 20px 추가 적용
		if( browserCheck.indexOf("ie") != -1 ){
			left = (screen.width/2 - w/2) + 20;
		} else {
			left = screen.width/2 - w/2;
		}

		if( top < 0 ) top = 0;
		if( left < 0 ) left = 0;
		tlOpt = ',top='+top +',left='+left;
	} else if( Object.prototype.toString.call(position) == "[object Object]" && "top" in position && "left" in position ){
		tlOpt = ',top='+position.top+',left='+position.left;
	}

	// 브라우저 체크
	if( browserCheck == "chrome" ){
		w = w + 18;
		h = h - 20;
	} else if( browserCheck == "firefox" ){
		w = w + 20;
		h = h - 5;
	}

	// 팝업 옵션 함치기
	sOpt = ( scroll == "scroll" || scroll === true ) ? ",scrollbars=yes" :  ""; // 창스크롤
	winOptions = tlOpt + ',width=' + w + ',height=' + h + sOpt + ', resizable=yes'; // top, left, width, height, location, menubar, resizable, scrollbar, status

	// 쿠키 popup 에 close가 없을경우 팝업창이 뜨고 popup에 close가 있을경우 팝업 안뜸(대략 한번만 보고 더이상 사용하지않을경우 사용)
	/*if( jQuery.cookie("popup") && jQuery.cookie("popup") != "close" ){
		var popWin = window.open(url,name,winOptions);

		return popWin;
	}*/

	var popWin = window.open(url,name,winOptions);

	return popWin;
}

// 기본형(div or ul, table)
function faqType(eleId, option){
	/* === option ===
	- effect : "normal" or "slide" ----- 내용이 노출될때 나오는 모션
	- active : null or Number ----- 1 ~ @ 입력가능하며 최대는 메뉴의 총갯수까지 적용(그 수를 넘으면 첫번째 메뉴가 활성화됨)
	*/
	var faqTypeDefault = {
		effect : "normal", // "normal" or "slide" ----- 내용이 노출될때 나오는 모션
		active : 0 // 0 ~ @ ----- 0은 비활성화, 1부터는 활성화 진행, 리스트 최대수보다 많을경우 첫번째가 활성화
	};
	var opt = Object.assign(faqTypeDefault, option);

	var $this = document.querySelector(eleId)
	, $btn = $this.querySelectorAll(".tab")
	, optActive = opt.active - 1
	, target = null
	, oldActive = null
	, hashValue = null;

	for( var i=0; i<$btn.length; i++ ){
		if( opt.effect == "slide" ){
			$btn[i].nextElementSibling.style.display = "block";
			$btn[i].nextElementSibling.style.height = 0;
		}

		// 버튼 클릭
		$btn[i].addEventListener("click", function(e){
			e.preventDefault();

			hashValue = hashFlag(this.hash);

			if( oldActive ){
				if( $this.tagName == "TABLE" ){
					if( this != oldActive ){
						oldActive.parentNode.parentNode.classList.remove("active");
						oldActive.parentNode.parentNode.nextElementSibling.style.display = "none";
					} else {
						if( oldActive.parentNode.parentNode.nextElementSibling.style.display != "none" ){
							oldActive.parentNode.parentNode.classList.remove("active");
							oldActive.parentNode.parentNode.nextElementSibling.style.display = "none";
						} else {
							oldActive.parentNode.parentNode.classList.add("active");
							oldActive.parentNode.parentNode.nextElementSibling.style.display = "table-row";
						}
					}
				} else {
					if( opt.effect == "normal" ){
						if( this != oldActive ){
							oldActive.classList.remove("active");
							if( hashValue ){
								document.querySelector(oldActive.hash).style.display = "none";
							} else {
								oldActive.nextElementSibling.style.display = "none";
							}
						} else {
							if( hashValue ){
								if( document.querySelector(oldActive.hash).style.display != "none" ){
									oldActive.classList.remove("active");
									document.querySelector(oldActive.hash).style.display = "none";
								} else {
									oldActive.classList.add("active");
									document.querySelector(oldActive.hash).style.display = "block";
								}
							} else {
								if( oldActive.nextElementSibling.style.display != "none" ){
									oldActive.classList.remove("active");
									oldActive.nextElementSibling.style.display = "none";
								} else {
									oldActive.classList.add("active");
									oldActive.nextElementSibling.style.display = "block";
								}
							}
						}
					} else {
						if( this != oldActive ){
							oldActive.classList.remove("active");
							if( hashValue ){
								document.querySelector(oldActive.hash).style.height = 0;
							} else {
								oldActive.nextElementSibling.style.height = 0;
							}
						} else {
							if( hashValue ){
								if( parseFloat(document.querySelector(oldActive.hash).style.height) != 0 ){
									oldActive.classList.remove("active");
									document.querySelector(oldActive.hash).style.height = 0;
								} else {
									oldActive.classList.add("active");
									document.querySelector(oldActive.hash).style.height = document.querySelector(oldActive.hash).scrollHeight + "px";
								}
							} else {
								if( parseFloat(oldActive.nextElementSibling.style.height) != 0 ){
									oldActive.classList.remove("active");
									oldActive.nextElementSibling.style.height = 0;
								} else {
									oldActive.classList.add("active");
									oldActive.nextElementSibling.style.height = oldActive.nextElementSibling.scrollHeight + "px";
								}
							}
						}
					}
				}
			}

			if( this != oldActive ){
				if( $this.tagName == "TABLE" ){
					this.parentNode.parentNode.classList.add("active");
					this.parentNode.parentNode.nextElementSibling.style.display = "table-row";
				} else {
					this.classList.add("active");

					if( hashValue ){
						if( opt.effect == "normal" ){
							document.querySelector(this.hash).style.display = "block";
						} else {
							document.querySelector(this.hash).style.height = document.querySelector(this.hash).scrollHeight + "px";
						}
					} else {
						if( opt.effect == "normal" ){
							this.nextElementSibling.style.display = "block";
						} else {
							this.nextElementSibling.style.height = this.nextElementSibling.scrollHeight + "px";
						}
					}
				}
			}

			oldActive = this;
		});
	}

	// 초기 활성화
	if( optActive >= 0 && optActive <= $btn.length ){
		$btn[optActive].classList.add("active");

		if( hashValue ){
			var initlNode = document.querySelector($btn[optActive].getAttribute("href"));

			if( opt.effect == "normal" ){
				initlNode.style.display = "block";
			} else {
				initlNode.style.height = initlNode.scrollHeight + "px";
			}
		} else {
			if( opt.effect == "normal" ){
				$btn[optActive].nextElementSibling.style.display = "block";
			} else {
				$btn[optActive].nextElementSibling.style.height = $btn[optActive].nextElementSibling.scrollHeight + "px";
			}
		}

		oldActive = $btn[optActive];
	}

	// 버튼에 href에 값이 있을경우
	function hashFlag(node){
		var flag;

		if( node && document.querySelectorAll(node).length ){
			flag = true;
		} else {
			flag = false;
		}

		return flag;
	}
}

// 툴팁 레이어
function toolTipToogle(eleId, option){
	/* === option ===
	- posAlign : "pointer" or "center" ----- 레이어 정렬 위치
	- targetId : "" or "id" ----- 버튼 href에 값이 없을경우 레이어 Id 및 Class 명
	- space : 10 ----- 마우스 포인트에서 레이어의 공간 적용
	*/
	var toolTipDefault = {
		posAlign : "pointer",
		targetId : "",
		space : 10,
		eventAfter : function(node, target){}
	}
	var opt = Object.assign(toolTipDefault, option);

	var thisParent = document.querySelector(eleId)
	, thisTag = thisParent.querySelectorAll(".tooltip_nick")
	, target = document.querySelector(opt.targetId)
	, Timer = null
	, motionTime = null
	, number = 0;

	// 버튼 클릭
	for( var i=0; i<thisTag.length; i++ ){
		thisTag[i].addEventListener("click", function(e){
			var pageX = e.pageX - opt.space
			, pageY = e.pageY - opt.space;

			if( !this.classList.contains("active") ){
				this.classList.add("active");

				// 레이어 중앙 정렬
				if( opt.posAlign == "center" ){
					this.parentNode.append( target );

					// 레이어의 위치 계산
					if( target.offsetWidth > this.parentNode.offsetWidth ){
						target.style.left = -Math.floor((target.offsetWidth - this.parentNode.offsetWidth)/2) + "px";
						target.style.top = (this.parentNode.offsetHeight-1) + "px";
					} else {
						target.style.left = Math.floor((this.parentNode.offsetWidth - target.offsetWidth)/2) + "px";
						target.style.top = (this.parentNode.offsetHeight-1) + "px";
					}
				} else {
					target.style.left = pageX + "px";
					target.style.top = pageY + "px";
				}

				opt.eventAfter(this, target);

				motion({ tag : target, type : "show" });
			} else {
				this.classList.remove("active");

				motion({ tag : target, type : "hide" });
			}

			e.preventDefault();
		});

		// 버튼 마우스아웃
		thisTag[i].parentNode.addEventListener("mouseleave", function(){
			if( this.querySelector(".tooltip_nick").classList.contains("active") ){
				this.querySelector(".tooltip_nick").classList.remove("active");

				motion({ tag : target, type : "hide" });
			}
		});
	}

	// 모션 함수
	function motion(m){
		var tag = m.tag
		, type = m.type;

		// 모션 중일때 정지
		if( motionTime ){
			clearInterval(motionTime);
		}

		// 초기 show 될경우 먼저 보이게 적용
		if( type == "show" ){
			tag.style.visibility = "visible";
		}

		// 애니메이션
		motionTime = setInterval(function(){
			if( type == "show" ){
				number = number + 0.1;
			} else {
				number = number - 0.1;
			}

			if( number > 1 || number < 0 ){
				clearInterval(motionTime);

				if( Math.floor(number) == -1 ){
					tag.style.visibility = "hidden";
				}
			} else {
				tag.style.opacity = number.toFixed(1);
			}
		}, 30);
	}
}

// 이미지 활성화 레이어
function overviewImage(eleId, option){
	/* === option ===
	- pos : "flow" or "fixed" ----- 레이어 위치 지정
	- maxSize : "300" ---- 이미지 최대 사이즈
	*/
	var overviewDefault = {
		pos : "flow", // "flow" or "fixed" ----- 레이어 위치 지정
		maxSize : "300" // 이미지 최대 사이즈
	};
	var opt = Object.assign(overviewDefault, option);

	var $this = document.querySelector(eleId)
	, $image = $this.querySelectorAll(".evt_overview")
	, targetLayer = null;

	for( var i=0; i<$image.length; i++ ){
		// 마우스 오버
		$image[i].addEventListener("mouseenter", function(e){
			var pageX = e.pageX
			, pageY = e.pageY;

			if( document.querySelector(".overImgLayer") ){
				document.querySelector(".overImgLayer").remove();
			}

			targetLayer = imageCreate({ node : this, src : this.getAttribute("data-src") });

			if( opt.pos == "fixed" ){
				targetLayer.style.left = 100 + "%";
				targetLayer.style.top = 100 + "%";
			} else {
				targetLayer.style.left = (pageX + 10) + "px";
				targetLayer.style.top = (pageY + 10) + "px";
			}
		});
		// 마우스 아웃
		$image[i].addEventListener("mouseleave", function(){
			if( targetLayer ){
				targetLayer.remove();
			}
		});
	}

	function imageCreate(m){
		var node = m.node
		, url = m.src
		, $image = new Image()
		, $layer = document.createElement("div");

		$layer.classList.add("overImgLayer")
		$layer.style.position = "absolute";

		$image.setAttribute("src", url);
		$image.onload = function(){
			if( this.width ){
				if( this.width > opt.maxSize ){
					this.style.width = opt.maxSize + "px";
				}

				$layer.appendChild( $image );
				if( opt.pos == "fixed" ){
					node.appendChild($layer);
				} else {
					document.body.appendChild($layer);
				}
			}
		};

		return $layer;
	}
}

// 캘린더
function calendar(option){
    /* ◈◈◈◈◈ Option ◈◈◈◈◈
    calendarId : "#js_calendarForm" ----- 캘린더 전체영역
    dateFormat : "yy-mm-dd" ----- 달력 날짜 형태
    buttonUse : false ----- 레이어 오픈 버튼 생성
    showView : "layer" ----- 달력 오픈 형태("default" or "layer")
    layerPos : "bottom" ----- 레이어 위치("top" or "bottom")
    layerEffect : "default" ----- 레이어 활성화 모션("default" or "fade")
    dayNamesMin : ["일", "월", "화", "수", "목", "금", "토"] ----- 요일 형태 배열
    dateFormat : "text" ----- "text" or "/" or "." ----- 날짜 타이틀 형식
    changeYear : false ----- 년도 Select 박스 여부
    changeMonth : false ----- 월 Select 박스 여부
    showOtherMonths : false ----- 1일 이전, 말일 이후에 빈공간
    minDate : false ----- 활성화 최소 날짜
    maxDate : false ----- 활성화 최대 날짜
    disabledDay : [] ----- 개별 비활성화 날짜 배열
    todayUse : false ----- 오늘버튼 기능
    layerCloseUse : { 
        show : true, ----- 닫기 버튼 생성(true or false)
        text : "닫기" ----- 버튼 텍스트("닫기") 또는 이미지 경로("img/btn_close.gif")
    }
    */
    var options = {
        calendarId : "#js_calendarForm", // Input ID
        dateFormat : "yy-mm-dd", // 달력 날짜 형태
        buttonUse : false, // 레이어 오픈 버튼 생성
        showView : "layer", // 달력 오픈 형태("default" or "layer")
        layerPos : "bottom", // 레이어 위치("top" or "bottom")
        layerEffect : "default", // 레이어 활성화 모션("default" or "fade")
        dayNamesMin : ["일", "월", "화", "수", "목", "금", "토"], // 요일 형태 배열
        dateFormat : "text", // 날짜 타이틀 형식("text" or "/" or ".")
        changeYear : false, // 년도 Select 박스 여부
        changeMonth : false, // 월 Select 박스 여부
        showOtherMonths : false, // 1일 이전, 말일 이후에 빈공간
        minDate : false,// 활성화 최소 날짜
        maxDate : false,// 활성화 최대 날짜
        disabledDay : [], // 개별 비활성화 날짜 배열
        todayUse : false, // 오늘버튼 기능
        layerCloseUse : {
            show : true, // 닫기 버튼 생성(true or false)
            text : "닫기" // 버튼 텍스트("닫기") 또는 이미지 경로("img/btn_close.gif")
        }
    };

    // 최종 옵션값
    var opt = Object.assign(options, option);

    // 날짜 함수
    var initDate = new Date()
    , date = new Date()
    , dateDay = date.getDate();

    // 캘린더
    var calendarForm = document.querySelector(opt.calendarId)
    , calendarInput = calendarForm.querySelector(".input_text")
    , calendarLayer = calendarForm.querySelector(".calendar_form");

    // 초기 레이어 옵션 - 위치
    calendarLayer.style.left = 0;
    if( opt.layerPos === "bottom" ){
		if( calendarInput.closest(".input_text_area") ){
			calendarLayer.style.top = calendarInput.closest(".input_text_area").offsetHeight + "px";
		} else {
			calendarLayer.style.top = calendarInput.offsetHeight + "px";
		}
    } else {
		if( calendarInput.closest(".input_text_area") ){
			calendarLayer.style.bottom = calendarInput.closest(".input_text_area").offsetHeight + "px";
		} else {
			calendarLayer.style.bottom = calendarInput.offsetHeight + "px";
		}
    }

    // 초기 레이어 기본 클래스
    if( opt.showView === "layer" ){
        calendarLayer.classList.add("calendar_form_layer");

        if( opt.layerEffect === "default" ){
            calendarLayer.style.display = "none";
        } else {
            setTimeout(() => {
                calendarLayer.classList.add("calendar_form_layer_fade");
            });
        }
    }

    // UI 생성
    uiCreate();

    // 목록이 들어갈 영역
    var tbodyForm = calendarLayer.querySelector("#js_dateTbody")
    , dateBtnPrev = calendarLayer.querySelector(".btn_prev")
    , dateBtnNext = calendarLayer.querySelector(".btn_next")
    , calendarListCount = 0
	, todayOldActive = null;

    // 목록 생성
    monthDate();

    // 타이틀 월별 생성
    dateTextView({
        dateValue : date
    });

    // 레이어 형태
    if( opt.showView !== "default" ){
        // 레이어 빈공간 클릭
        calendarLayer.addEventListener("click", function(e){
            // 기본 링크 삭제
            e.preventDefault();
            // 버블링 삭제
            e.stopPropagation();
        });

        // 입력 Input Click
        calendarInput.addEventListener("click", function(e){
            // 버블링 삭제
            e.stopPropagation();
        });

        // 레이어 활성화 버튼 여부
        if( !opt.buttonUse ){
            // 입력 Input Click
            calendarInput.addEventListener("click", function(e){
                // 달력 레이어 활성화
                layerClose({ show : true });
            });
        } else {
            var btnLayerOpen = calendarForm.querySelector(".btn_open");
            btnLayerOpen.addEventListener("click", function(e){
                // 버블링 삭제
                e.stopPropagation();

                if( opt.layerEffect === "default" ){
                    if( calendarLayer.style.display === "none" ){
                        // 달력 레이어 활성화
                        layerClose({ show : true });
                    } else {
                        // 달력 레이어 활성화
                        layerClose({ show : false });
                    }
                } else {
                    if( !calendarLayer.classList.contains("calendar_form_layer_fade_active") ){
                        // 달력 레이어 활성화
                        layerClose({ show : true });    
                    } else {
                        // 달력 레이어 활성화
                        layerClose({ show : false });
                    }
                }
            });
        }

        // window 클릭
        window.addEventListener("click", function(e){
            // 레이어 숨김(default)
            if( calendarLayer.style.display === "block" ){
                // 달력 레이어 활성화
                layerClose({ show : false });
            }

            // 레이어 숨김(fade)
            if( calendarLayer.classList.contains("calendar_form_layer_fade_active") ){
                // 달력 레이어 활성화
                layerClose({ show : false });
            }
        });

        // 닫기 버튼 활성화
        if( opt.layerCloseUse.show ){
            var btnClose = calendarLayer.querySelector(".btn_close button");
            // 닫기 버튼 클릭
            btnClose.addEventListener("click", function(){
                // 달력 레이어 비활성화
                layerClose({ show : false });
            }); 
        }
    } else {
        calendarInput.style.display = "none";
    }

    // 오늘 버튼 활성화
    if( opt.todayUse ){
        var btnToday = calendarLayer.querySelector(".btn_today button");
        // 오늘 버튼 클릭
        btnToday.addEventListener("click", function(){
            // 활성화된 날짜가 오늘이 아닐경우
            if( date.getFullYear() !== initDate.getFullYear() || date.getMonth() !== initDate.getMonth() ){
                // 날짜 목록 삭제
                dateReset();

                // 활성화 년, 월 생성
                dateTextView({
                    dateValue : initDate
                });

                // 목록 생성
                monthDate();
            }
        }); 
    }

    // 이전달 버튼 클릭
    dateBtnPrev.addEventListener("click", function(e){
        // 기본 링크 삭제
        e.preventDefault();

        // 날짜 목록 삭제
        dateReset();

        // 활성화 년, 월 생성
        dateTextView({
            dateValue : date,
            mValue : -1
        });

        // 목록 생성
        monthDate();
    });

    // 다음달 버튼 클릭
    dateBtnNext.addEventListener("click", function(e){
        // 기본 링크 삭제
        e.preventDefault();

        // 날짜 목록 삭제
        dateReset();

        // 활성화 년, 월 생성
        dateTextView({
            dateValue : date,
            mValue : 1
        });

        // 목록 생성
        monthDate();
    });

    // 년, 월 셀렉트박스 Change 이벤트
    function calendarSelEvent(){
        // 년도
        if( opt.changeYear ){
            var selectYear = calendarLayer.querySelector(".js_select_year");
            // Select Change 이벤트
            selectYear.addEventListener("change", function(){
                // 날짜 목록 삭제
                dateReset();

                // 활성화 년, 월 생성
                dateTextView({
                    dateValue : date,
                    yValue : Number(this.value)
                });

                // 목록 생성
                monthDate();
            });
        }

        // 월별
        if( opt.changeMonth ){
            var selectMonth = calendarLayer.querySelector(".js_select_month");
            // Select Change 이벤트
            selectMonth.addEventListener("change", function(){
                // 날짜 목록 삭제
                dateReset();

                // 활성화 년, 월 생성
                dateTextView({
                    dateValue : date,
                    sValue : Number(this.value)
                });

                // 목록 생성
                monthDate();
            });
        }
    }    

    // 달력 버튼 이벤트
    function calendarBtnEvent(){
        var calendarButton = calendarLayer.querySelectorAll(".btn_date");
        Array.prototype.forEach.call(calendarButton, function(v, i){
            v.addEventListener("click", function(e){
                // 기본 링크 삭제
                e.preventDefault();

                // 년, 월, 일 생성
                var year = this.parentNode.getAttribute("data-year")
                , month = dateLength(this.parentNode.getAttribute("data-month"))
                , day = dateLength(this.innerText)
                , result = null;

				// 이전 클릭한 날짜 비활성화
				if( todayOldActive ){
					todayOldActive.parentNode.classList.remove("choice_day");
				}

				// 클래스 추가
				this.parentNode.classList.add("choice_day");

                // 기본 텍스트형
                if( opt.dateFormat === "text" ){
                    result = year + "-" + month + "-" + day;
                } else {
                    result = year + opt.dateFormat + month + opt.dateFormat + day;
                }

                // 최종값 적용
                calendarInput.value = result;

				// 현재 선택한 요일 저장
				todayOldActive = this;
            });
        });
    }

    // 테이블 내용 생성
    function monthDate(){
        var dateToday = new Date()
        , firstDate = new Date(date.getFullYear(), date.getMonth())
        , lastDate = new Date(date.getFullYear(), date.getMonth()+1, 0);

        // 초기 Tr 생성
        var rows = tbodyForm.insertRow();
        // 테이블 1일 앞쪽 빈 TD
        monthFirstSpace({ tr : rows, first : firstDate });

        for( var i=0; i<lastDate.getDate(); i++ ){
            // TD 생성
            var colums = rows.insertCell();
            colums.setAttribute("data-year", date.getFullYear());
            colums.setAttribute("data-month", date.getMonth()+1);

            // 선택 가능한 최소 활성화 버튼
            if( opt.minDate ){
                var dateMin = new Date(opt.minDate)
                , dateMinYear = dateMin.getFullYear()
                , dateMinMonth = dateMin.getMonth()+1
                , dateMinDay = dateMin.getDate();

                if( date.getFullYear() !== dateMinYear ){
                    colums.classList.add("disabled");
                } else {
                    if( date.getMonth()+1 < dateMinMonth ){
                        colums.classList.add("disabled");
                    } else if( date.getMonth()+1 === dateMinMonth ) {
                        if( i+1 < dateMinDay ){
                            colums.classList.add("disabled");
                        }
                    }
                }
            }

            // 선택 가능한 최소 활성화 버튼
            if( opt.maxDate ){
                var dateMax = new Date(opt.maxDate)
                , dateMaxYear = dateMax.getFullYear()
                , dateMaxMonth = dateMax.getMonth()+1
                , dateMaxDay = dateMax.getDate();

                if( date.getFullYear() !== dateMaxYear ){
                    colums.classList.add("disabled");
                } else {
                    if( date.getMonth()+1 > dateMaxMonth ){
                        colums.classList.add("disabled");
                    } else if( date.getMonth()+1 === dateMaxMonth ) {
                        if( i+1 > dateMaxDay ){
                            colums.classList.add("disabled");
                        }
                    }
                }
            }

            // 비활성화 요일
            if( opt.disabledDay.length ){
                for( var j=0; j<opt.disabledDay.length; j++ ){
                    var valueYear = Number(opt.disabledDay[j].split("/")[0])
                    , valueMonth = Number(opt.disabledDay[j].split("/")[1])
                    , valueDay = Number(opt.disabledDay[j].split("/")[2]);

                    if( valueYear === date.getFullYear() &&
                        valueMonth === date.getMonth()+1 &&
                        valueDay === i+1
                    ){
                        colums.classList.add("disabled");
                    }
                }
            }
            
            // 오늘 활성화
            if( dateToday.getFullYear() === date.getFullYear() && dateToday.getMonth()+1 === date.getMonth()+1 ){
                if( (dateDay - 1) === i ){
                    colums.classList.add("today");
                }
            }

            // 버튼 생성
            if( colums.classList.contains("disabled") ){
                var span = document.createElement("span")
                span.innerText = i + 1;

                colums.append( span );
            } else {
                // 버튼 생성
                var button = document.createElement("a")
				, buttonSpan = document.createElement("span");
                button.setAttribute("href", "#");
                button.classList.add("btn_date");
				button.append( buttonSpan );
                buttonSpan.innerText = i + 1;

                colums.append( button );
            }

            // 총 카운트 증가
            calendarListCount++;

            // 7칸을 기준으로 Row 생성
            if( calendarListCount % 7 === 0 ){
                colums.classList.add("sat");

                rows = tbodyForm.insertRow();
            } else if( calendarListCount % 7 === 1 ){
                colums.classList.add("sun");
            }
        }

        // 테이블 말일 뒤쪽 빈 TD
        monthLastSpace({ tr : rows, last : lastDate });

        // 달력 버튼 이벤트
        calendarBtnEvent();
    }

    // 테이블 1일 앞쪽 빈 TD
    function monthFirstSpace(m){
        var row = m.tr
        , firstNum = m.first;

        var monthPrevDate = new Date(date.getFullYear(), date.getMonth(), 0)
        , monthPrevDay = monthPrevDate.getDate();

        for( i=0; i<firstNum.getDay(); i++ ){
            var colums = row.insertCell();

            // 1일 이전 빈공간 활성화 여부
            if( opt.showOtherMonths ){
                var spanTag = document.createElement("span");
                // Td 추가 및 속성
                colums.classList.add("space");
                colums.append( spanTag );

                // Span 태그 테스트 추가
                spanTag.innerText = (monthPrevDay - (firstNum.getDay() - 1)) + i;
            }

            // 총 카운트 증가
            calendarListCount++;
        }
    }

    // 테이블 말일 뒤쪽 빈 TD
    function monthLastSpace(m){
        var row = m.tr
        , lastNum = m.last;

        for( i=lastNum.getDay()+1; i<7; i++ ){
            var colums = row.insertCell()

            // 말일 이전 빈공간 활성화 여부
            if( opt.showOtherMonths ){
                var spanTag = document.createElement("span");
                // Td 추가 및 속성
                colums.classList.add("space");
                colums.append( spanTag );

                // Span 태그 테스트 추가
                spanTag.innerText = i;
            }

            // 총 카운트 증가
            calendarListCount++;
        }
    }

    // 활성화 년, 월 생성
    function dateTextView(m){
        var mDate = m.dateValue
        , yearValue = m.yValue ? m.yValue : null
        , monthValue = m.mValue ? m.mValue : null
        , selectMonthValue = m.sValue ? m.sValue : null;

        var titleDate = calendarLayer.querySelector("#js_dateTitle");
        if( !yearValue ){
            date.setFullYear(mDate.getFullYear());
        } else {
            date.setFullYear(yearValue);
        }
        if( !monthValue ){
            if( selectMonthValue ){
                var setMonthCheck = date.setMonth(selectMonthValue-1);
            } else {
                var setMonthCheck = date.setMonth(mDate.getMonth());
            }
        } else {
            var setMonthCheck = date.setMonth(mDate.getMonth() + monthValue);            
        }
        var totalMonth = new Date(setMonthCheck)
        , firstValue = null
        , lastValue = null;

        // 년도 출력(텍스트 또는 셀렉트박스)
        if( opt.changeYear ){
            var yearSelect = document.createElement("select")
            , yearSelectFirst = initDate.getFullYear() - 11;
            yearSelect.classList.add("select", "js_select_year");

            // Option 21개 생성(앞으로 10개, 뒤로 10개)
            for( i=0; i<21; i++ ){
                var yearSelectOption = document.createElement("option");
                yearSelectOption.setAttribute("value", yearSelectFirst + (i + 1));
                // 현재 년도를 활성화
                if( yearSelectFirst + (i + 1) === mDate.getFullYear() ){
                    yearSelectOption.selected = true;
                }
                yearSelectOption.innerText = yearSelectFirst + (i + 1);

                yearSelect.append( yearSelectOption );
            }

            firstValue = yearSelect;
        } else {
            firstValue = totalMonth.getFullYear();
        }

        // 월 출력(텍스트 또는 셀렉트박스)
        if( opt.changeMonth ){
            var yearMonth = document.createElement("select")
            yearMonth.classList.add("select", "js_select_month");

            // Option 21개 생성(앞으로 10개, 뒤로 10개)
            for( j=0; j<12; j++ ){
                var yearMonthOption = document.createElement("option");
                yearMonthOption.setAttribute("value", j + 1);
                // 현재 년도를 활성화
                if( j + 1 === mDate.getMonth() + 1 ){
                    yearMonthOption.selected = true;
                }
                yearMonthOption.innerText = j + 1;

                yearMonth.append( yearMonthOption );
            }

            lastValue = yearMonth;
        } else {
            lastValue = dateLength(totalMonth.getMonth()+1);
        }

        // 기본 텍스트형
        if( opt.dateFormat === "text" ){
            titleDate.innerHTML = "";
            // 최종 티이틀 적용
            titleDate.append( 
                firstValue,
                "년 ",
                lastValue,
                "월"
            );
        } else { // 기호형 "/" or "."
            titleDate.innerHTML = "";
            // 최종 티이틀 적용
            titleDate.append( 
                firstValue,
                " " + opt.dateFormat + " ",
                lastValue
            );
        }

        // 셀력트박스(년, 월) 이벤트
        calendarSelEvent();
    }

    // 달력 비활성화
    function layerClose(m){
        if( m.show ){
            // 여러개 달력레이어가 열려있을경우
            if( Object.keys(document.querySelectorAll(".calendar_form")).length >= 2 ){
                var calendarForm = document.querySelectorAll(".calendar_form");
                
                for( var i=0; i<Object.keys(calendarForm).length; i++ ){
                    if( calendarForm[i].style.display ){
                        calendarForm[i].style.display = "none";
                    } else {
                        calendarForm[i].classList.remove("calendar_form_layer_fade_active");
                    }
                }
            }

            if( opt.layerEffect === "default" ){
                if( calendarLayer.style.opacity !== 1 ){
                    calendarLayer.style.opacity = 1;    
                }
                if( calendarLayer.style.visibility !== "visible" ){
                    calendarLayer.style.visibility = "visible";
                }

                calendarLayer.style.display = "block";
            } else if( opt.layerEffect === "fade" ) {
                calendarLayer.classList.add("calendar_form_layer_fade_active");
            }
        } else {
            if( opt.layerEffect === "default" ){
                calendarLayer.style.display = "none";
            } else {
                calendarLayer.classList.remove("calendar_form_layer_fade_active");
            }
        }        
    }

    // UI 생성
    function uiCreate(){
        // 레이어 활성화 버튼 생성
        if( opt.buttonUse ){
			// 여러번 실행했을경우 기존 버튼 삭제
			if( calendarForm.querySelector("button") ){
				calendarForm.querySelector("button").remove();
			}

			var inputBtnHeight = calendarInput.closest(".input_text_area") ? calendarInput.closest(".input_text_area").clientHeight : calendarInput.clientHeight
            , openBotton = document.createElement("button");
            openBotton.classList.add("btn_open");
            openBotton.style.cssText = "width:" + inputBtnHeight + "px; height:" + inputBtnHeight + "px; margin-left:3px; text-indent:-9999px; vertical-align:middle; border:none; background:url('../../image/common/calendar.png') 0 0 / contain no-repeat; cursor:pointer";
            openBotton.innerText = "달력 오픈";
            
            calendarForm.append( openBotton );
            calendarForm.insertBefore(openBotton, calendarLayer);
        }

        // 날짜 영역 생성
        var headerForm = document.createElement("div")
        , headerBtnPrev = document.createElement("button")
        , headerDate = document.createElement("span")
        , headerBtnNext = document.createElement("button");

        // 날짜 리스트 생성
        var bodyTable = document.createElement("table")
        , bodyThead = document.createElement("thead")
        , bodyTheadTr = document.createElement("tr")
        , bodyTbody = document.createElement("tbody");

        // ▶▶▶ 날짜 상단 영역 ◀◀◀
        // 날짜 영역
        headerForm.classList.add("calendar_header");

        // 이전달 버튼
        headerBtnPrev.setAttribute("type", "button");
        headerBtnPrev.classList.add("btn_prev");
        headerBtnPrev.innerText = "이전";
        
        // 요일 텍스트
        headerDate.setAttribute("id", "js_dateTitle");
        headerDate.classList.add("date");

        // 이전달 버튼
        headerBtnNext.setAttribute("type", "button");
        headerBtnNext.classList.add("btn_next");
        headerBtnNext.innerText = "다음";

        // 내용 적용
        headerForm.append(
            headerBtnPrev,
            headerDate,
            headerBtnNext
        );

        // ▶▶▶ 요일 목록 영역 ◀◀◀
        bodyTable.classList.add("calendar_body");

        // Th 생성
        for( var th=0; th<opt.dayNamesMin.length; th++ ){
            var bodyTheadTh = document.createElement("th")
            bodyTheadTh.setAttribute("scope", "col");
            bodyTheadTh.innerText = opt.dayNamesMin[th];

            // 일요일 클래스 추가
            if( th === 0 ){
                bodyTheadTh.classList.add("sun");
            } else if( th === opt.dayNamesMin.length - 1 ){ // 토요일 클래스 추가
                bodyTheadTh.classList.add("sat");
            }
            
            bodyTheadTr.append(
                bodyTheadTh
            );
        }

        // Thead 생성
        bodyThead.append(
            bodyTheadTr
        );

        // Tbody 생성
        bodyTbody.setAttribute("id", "js_dateTbody");

        // 테이블 생성
        bodyTable.append(
            bodyThead,
            bodyTbody
        )

        // 캘린더 전체영역 생성
        calendarLayer.append(
            headerForm,
            bodyTable
        );

        // ▶▶▶ 하단 컨트롤 영역 ◀◀◀
        if( opt.todayUse || opt.layerCloseUse.show ){
            // 하단 컨트롤 영역
            var bottomForm = document.createElement("div");
            bottomForm.classList.add("calendar_controll_box");

            // 오늘 버튼 영역
            if( opt.todayUse ){
                var bottomToday = document.createElement("p")
                , bottomTodayBtn = document.createElement("button");

                bottomToday.classList.add("btn_today");
                bottomTodayBtn.setAttribute("type", "button");
                bottomTodayBtn.innerText = "오늘";
                bottomToday.append( bottomTodayBtn );
                
                bottomForm.append( bottomToday );
            }

            // 닫기 버튼 영역
            if( opt.layerCloseUse.show ){
                // 레이어 형태일때만 닫기버튼 생성
                if( opt.showView === "layer" ){
                    var bottomClose = document.createElement("p")
                    , bottomCloseBtn = document.createElement("button");
                    // 닫기버튼 생성
                    bottomCloseBtn.setAttribute("type", "button");
                    bottomClose.classList.add("btn_close");
                    // 이미지형 체크
                    if ( /(\.gif|\.jpg|\.jpeg)$/i.test(opt.layerCloseUse.text) ) {
                        bottomClose.classList.add("btn_type_image");
                        // 이미지 생성
                        var btn_close_img = document.createElement("img");
                        btn_close_img.setAttribute("src", opt.layerCloseUse.text);
                        btn_close_img.setAttribute("alt", "닫기");
                        bottomCloseBtn.append( btn_close_img );
                    } else {
                        bottomCloseBtn.innerText = opt.layerCloseUse.text;
                    }
                    bottomClose.append( bottomCloseBtn );

                    // 닫기 버튼 Append
                    bottomForm.append( bottomClose );
                }
            }

            // 캘린더 전체영역 생성
            calendarLayer.append(
                bottomForm
            );
        }
    }

    // 달력 날짜 초기화
    function dateReset(){
        // 테이블 날짜 내용 삭제
        tbodyForm.innerHTML = "";

        // 전체 카운팅 초기화
        calendarListCount = 0;
    }

    // 월, 일 한자리 일경우 2자리로 변경
    function dateLength(value){
        var data = String(value)
        , result = null;

        // Data값이 한자리일경우
        if( data.length === 1 ){
            result = "0" + data;
        } else {
            result = data;
        }

        return result;
    }
}

// 상단 이동
function btnTopMove(){
    // 상단 버튼
    var btn = $(".btn_top");

	// 상단에서 전체높이의 1/3 이상 스크롤 이동
    if( $(window).scrollTop() >= Math.floor($(window).height()/3) ){
        if( btn.css("display") == "none" ){
            btn.fadeIn();
        }
    } else {
        if( btn.css("display") != "none" ){
            btn.fadeOut();
        }
    }

    // 버튼 클릭
    btn.off("click").on("click", function(e){
        // 기본링크 기능삭제
        e.preventDefault();

		// 상단으로 이동
        $("body, html").animate({ scrollTop : 0 }, 400);
    });
}

// 메뉴별 스크립트
(function($){
	// Quick Menu
	$.fn.quickMenu = function(options){
		var opt = $.extend({}, options || {})
		, $this = $(this)
		, $thisOpen = $("#js_quickMenu_open")
		, $container = $(".container");

		// 버튼 클릭
		$this.on("click", function(e){
			if( !$container.hasClass("container_hidden") ){
				$container.addClass("container_hidden")
			} else {
				$container.removeClass("container_hidden")
			}
		});

		// 오픈 버튼 클릭
		$thisOpen.on("click", function(){
			if( !$container.hasClass("container_hidden") ){
				$container.addClass("container_hidden")
			} else {
				$container.removeClass("container_hidden")
			}
		});
	}

	// Gnb menu
	$.fn.gnbType = function(options){
		var option = $.extend({}, $.fn.gnbType.defaults, options || {});

		return this.each(function(){
			var $this = $(this)
			, $btn = $this.find(".menu-title")
			, evtKinds = ( option.evtKinds == "click" ) ? "click" : "mouseenter"
			, oldActives, timer, $submenu;

			// 메뉴 클릭 및 마우스 오버
			$btn.bind(evtKinds, function(){
				var that = $(this);

				// 이전 메뉴 및 같은메뉴 오버시 체크
				if( oldActives && oldActives != this ){
					$(oldActives).parent().removeClass("active");

					if( $(oldActives).next().length ){
						$(oldActives).next().hide();
					} else {
						$(oldActives.hash).hide();
					}
				}

				$(this).parent().addClass("active");

				// href를 사용해서 서브메뉴 활성화 및 그렇지 않고 형제태그를 사용할경우
				if( $(this).next().length ){
					$submenu = $(this).next();

					$(this).next().show();
				} else {
					$submenu = $(this.hash);

					$(this.hash).show();
				}

				// 활성화시 서브 메뉴 비활성화
				$submenu.find("li").removeClass("on");

				// 서브 메뉴 오버 이벤트
				$submenu.find("a").unbind("mouseenter");
				$submenu.find("a").bind("mouseenter", function(){
					$submenu.find("li").removeClass("on");

					$(this).parent().addClass("on")	;
				});

				oldActives = this;

				return false;
			});

			// 전체영역 아웃할경우 활성화된 서브메뉴 비활성
			if( option.resetSubLayer ){
				$btn.bind("mouseenter", function(){
					if( timer ) clearTimeout(timer);
				});
				$this.bind("mouseleave", function(){
					var that = $(this);

					timer = setTimeout(function(){
						for( var i=0; i<that.find(".layer").length; i++ ){
							if( that.find(".layer").eq(i).css("display") != "none" ){
								that.find(".layer").eq(i).hide();
							}
						}
					}, 100);
				});
			}

			// 메뉴영역을 벗어날경우 활성화
			if( option.outFocusActive ){
				$btn.bind("mouseenter", function(){
					if( timer ) clearTimeout(timer);
				});
				$this.bind("mouseenter", function(){
					if( timer ) clearTimeout(timer);
				});
				$this.bind("mouseleave", function(){
					var that = $(this);

					timer = setTimeout(function(){
						if( option.initActive ){
							that.find(".layer").each(function(i, v){
								if( $(v).css("display") != "none" && option.initActive - 1 != i ){
									that.find(".layer").hide();

									$btn.eq(option.initActive - 1).trigger(evtKinds);
								}
							});
						} else {
							// 메뉴 비활성화
							$btn.each(function(i, v){
								if( $(v).parent().hasClass("active") ){
									$(v).parent().removeClass("active");
								}
							});
							// 서브메뉴 비활성화
							that.find(".layer").hide();
						}
					}, 100);
				});
			}

			// 메뉴 활성화시 하단에 깔릴 배경 활성화
			if( option.backbgActive.active ){
				var backNode
				, backTime;

				// 메뉴 마우스오버
				$btn.on("mouseenter", function(){
					if( !backNode ){
						backNode = backDivCreate();

						backNode.show();
					} else {
						clearTimeout(backTime);
					}
				});
				// 메뉴 마우스아웃
				$this.on("mouseenter", function(){
					if( $btn.parent().hasClass("active") ){
						clearTimeout(backTime);
					}
				});
				// 메뉴 마우스아웃
				$this.on("mouseleave", function(){
					if( backNode ){
						backTime = setTimeout(function(){
							backNode.remove();

							backNode = null;
						}, 100);
					}
				});
			}

			// 초기 활성화
			if( option.initActive ){
				if( option.initActive && option.initActive > $btn.length ) $btn.eq(0).trigger(evtKinds);
				else $btn.eq(option.initActive - 1).trigger(evtKinds);
			}

			// 배경 DIV 생성
			function backDivCreate(){
				var $div = $("<div></div>").addClass("gnbMenu_bg")
				, widthPos = null
				, heightPos = null;

				if( option.backbgActive.pos == "body" ){
					widthPos = $(window).width();
					heightPos = $(window).height();

					$(option.backbgActive.pos).append( $div );
				} else {
					widthPos = $(option.backbgActive.pos).outerWidth();
					heightPos = $(option.backbgActive.pos).outerHeight();

					$(option.backbgActive.pos).append( $div );
				}

				$div.css({ position : "absolute", left : 0, top : 0, width : widthPos, height : heightPos, opacity : 0.3, background : "#000", zIndex : parseFloat($this.css("z-index"))-1 });

				return $div;
			}
		});
	};
	/*
		== option ==
		outFocusActive : false ( true or false ) ---- 메뉴영역을 벗어날경우 활성화
		resetSubLayer : false ( true or false ) ---- 전체역영 마우스 아웃할경우 서브메뉴 사라짐
		backbgActive : false ( true or false ) ---- 메뉴 활성화시 하단에 깔릴 배경 활성화
		initActive : false ( 1 ~ ) ---- 초기 활성화 번호
		evtKinds : "click" ( click or over ) ---- 이벤트 선택
	*/
	$.fn.gnbType.defaults = {
		outFocusActive : false,
		resetSubLayer : false,
		backbgActive : { active : false, pos : "body" },
		initActive : false,
		evtKinds : "click"
	}

	// Snb 메뉴
	$.fn.snbMenu = function(options){
		var opt = $.extend({}, $.fn.snbMenu.defaults, options || {});

		return this.each(function(){
			var $this = $(this)
			, $btnMenu = $this.find(".menu_depth")
			, activeCount = opt.active
			, oldActive = null;

			// 버튼 클릭
			$btnMenu.on("click", function(e){
				// 기본링크 삭제기능
				if( $(this).attr("href").indexOf(".html") == -1 ){
					e.preventDefault();
				}

				// 서브메뉴가 있을경우
				if( $(this).next().length ){
					// 이전과 다른메뉴 클릭
					if( this !== oldActive ){
						if( oldActive ){
							// 메뉴 비활성화
							menuClose(oldActive);
						}

						// 메뉴 활성화
						menuOpen(this);
					} else { // 이전과 같은메뉴 클릭
						if( $(this).parent().hasClass("active") ){
							// 메뉴 비활성화
							menuClose(this);
						} else {
							// 메뉴 활성화
							menuOpen(this);
						}
					}

					// 현재값 저장
					oldActive = this;
				}
			});

			// 메뉴 활성화
			function menuOpen(node){
				$(node).parent().addClass("active");
				$(node).next().slideDown(300);
			}

			// 메뉴 비활성화
			function menuClose(node){
				$(node).parent().removeClass("active");
				$(node).next().slideUp(300);
			}

			// 초기 활성화(Active 클래스)
			for( var i=0; i<$btnMenu.length; i++ ){
				if( $btnMenu.eq(i).parent().hasClass("active") ){
					$btnMenu.eq(i).trigger("click");

					break;
				}
			}

			// 초기 활성화
			if( activeCount ){
				if( activeCount < $btnMenu.length ){
					$btnMenu.eq(activeCount - 1).trigger("click");
				} else {
					$btnMenu.eq(0).trigger("click");
				}
			}
		});
	}
	/* === option ===
	- active : 1 or Number ----- 1 ~ @ 입력가능하며 최대는 메뉴의 총갯수까지 적용(그 수를 넘으면 첫번째 메뉴가 활성화됨)
	*/
	$.fn.snbMenu.defaults = {
		active : null
	};
})(jQuery);

// input node
(function($){
	// input length delete
	$.fn.inputValLength = function(options){
		var option = $.extend({}, $.fn.inputValLength.defaults, options || {});

		return this.each(function(){
			var $this = $(this)
			, $input = $this.find(option.inputValue)
			, maxCount = option.maxCount
			, fullCount = 0
			, resetCount = 0
			, regCase = null
			, oldValue = null;

			// 인풋 값이 변경될때마다
			$input.bind("keyup", function(){
				var that = this
				, index = $input.index(this)
				, value = $(this).val()
				, indexMaxCount = ( $.isArray(maxCount) ) ? maxCount[index] : maxCount;

				value = specCharEmpty($(this).val());
				$(this).val(value);
				stringUpper($(this), value); // 대문자 변환

				if( value.length >= indexMaxCount ){
					if( !regCase.test(value) ){
						if( $(this).next(".input-text").length ) $(this).next(".input-text").trigger("focus");
						else $(this).trigger("blur");
					}

					$(that).val($(that).val().substr(0, indexMaxCount));
				}

				oldValue = value;
			});

			// 인풋 값을 붙여넣기 했을경우
			$input.bind("paste", function(){
				var that = this;

				setTimeout(function(){
					var index = $input.index(that)
					, indexMaxCount = ( $.isArray(maxCount) ) ? maxCount[index] : maxCount;

					stringUpper($(that), $(that).val()); // 대문자 변환

					var copyValue = specCharEmpty($(that).val());

					if( copyValue.length > indexMaxCount + 1 ){
						for( var j=index; j<$input.length; j++){
							$input.eq(j).each(function(i, v){
								fullCount = resetCount + indexMaxCount[j]

								if( $input.eq(j).next(".input-text").length ) $input.eq(j).next(".input-text").trigger("focus");
								else $input.eq(j).trigger("blur");

								$(v).val(copyValue.substr(resetCount, indexMaxCount[j]));

								resetCount = fullCount;
							});
						}

						resetCount = 0;
						fullcount = 0;
					} else {
						$(that).val(copyValue.substr(0, indexMaxCount[index]));
					}
				}, 10);
			});

			// 소문자 영문 대문자 변경 함수
			function stringUpper(node, value){
				var regLowercase = /[a-z]/g;

				$(node).val(value.toUpperCase()); // 대문자 변환
			}

			// 영문(소문자, 대문자), 숫자만 추출
			function specCharEmpty(value){
				if( option.casebycase == "engNum" ){
					regCase = /[^a-z0-9A-Z]/gi;
				} else if( option.casebycase == "number" ){
					regCase = /[^0-9]/gi;
				} else if( option.casebycase == "english" ){
					regCase = /[^a-zA-Z]/gi;
				}

				var clearValue = value.replace(regCase, ""); //영문, 숫자 제외한 텍스트 공백처리

				return clearValue;
			}
		});
	}
	/*
	 * inputValue : "input" ---- input 클래스 및 아이디
	 * maxCount : 4 ---- input 에 들어갈 텍스트 최대수(input 이 여러개일경우 [4, 4, 6] - input의 수에 맞쳐서 배열값 추가)
	 * casebycase : "number" or "english" or "engNum" ---- input 에 들어갈 텍스트 형태
	 */
	$.fn.inputValLength.defaults = { inputValue : "input", maxCount : 4, casebycase : "engNum" };
})(jQuery);

// 토글 레이어 스크립트
(function($){
	// 툴팁(사용자정보 레이어)
	$.fn.toolTipLayer = function(option){
		var opt = $.extend({}, $.fn.toolTipLayer.defaults, option || {});

		return this.each(function(){
			var $this = $(this) // 닉네임 버튼
			, $userLayer = $("#js_userInfoLayer") // 사용자정보 레이어
			, $userLayerName = $userLayer.find(".name") // 사용자정보 닉네임
			, $userLayerBtn = $userLayer.find("a") // 사용자정보 버튼
			, thisWidth = $this.outerWidth()/2
			, thisHeight = $this.outerHeight()+2
			, totalX = null
			, totalY = null
			, timerLayer = null;

			// 닉네임 클릭
			$this.on("click", function(e){
				e.preventDefault();

				var posX = e.pageX,
				posY = e.pageY;

				// 레이어 활설화 실행
				evtActiveLayer({ event : e, eventX : posX, eventY : posY, value : $(this).text() });
			});

			// 닉네임 마우스오버
			$this.on("mouseenter", function(){
				// 레이어 닫기 기능 삭제
				if( timerLayer ){
					clearTimeout(timerLayer);

					timerLayer = null;
				}
			});

			// 닉네임 마우스오버
			$this.on("mouseleave", function(){
				timerLayer = setTimeout(function(){
					// 레이어 위치 비활성화
					$userLayer.fadeOut(300);
				}, 200);
			});

			// 레이어 마우스아웃
			$userLayer.on("mouseenter", function(){
				// 레이어 닫기 기능 삭제
				if( timerLayer ){
					clearTimeout(timerLayer);

					timerLayer = null;
				}
			});

			// 레이어 마우스아웃
			$userLayer.on("mouseleave", function(){
				var that = this;

				timerLayer = setTimeout(function(){
					// 레이어 위치 비활성화
					$(that).fadeOut(300);
				}, 200);
			});

			// 레이어 버튼 마우스오버
			$userLayerBtn.on("mouseenter", function(){
				$(this).parent().addClass("active");
			});

			// 레이어 버튼 마우스아웃
			$userLayerBtn.on("mouseleave", function(){
				$(this).parent().removeClass("active");
			});

			// 클릭 이벤트 함수
			function evtActiveLayer(m){
				var eventE = m.event
				, eventX = m.eventX
				, eventY = m.eventY
				, value = m.value;

				// 닉네임 레이어에 적용
				$userLayerName.text( value );

				// 토굴 조건
				if( opt.posAlign == "center" ){
					var thisLeft = eventE.target.offsetLeft,
					thisTop = eventE.target.offsetTop,
					userLayerWidth = $userLayer.outerWidth()/2;

					totalX = (thisLeft + thisWidth) - userLayerWidth;
					totalY = thisTop + thisHeight;

					if( $userLayer.css("display") == "none" ){
						// 레이어 위치 활성화
						$userLayer.css({ position : "absolute", left : totalX, top : totalY }).fadeIn(300);
					} else {
						// 레이어 위치 비활성화
						$userLayer.css({ position : "absolute", left : totalX, top : totalY }).fadeOut(300);
					}
				} else {
					if( $userLayer.css("display") == "none" ){
						totalX = eventX + 10;
						totalY = eventY + 10;

						// 레이어 위치 활성화
						$userLayer.css({ position : "absolute", left : totalX, top : totalY }).fadeIn(300);
					} else {
						$userLayer.fadeOut(300);
					}
				}
			}
		});
	}
	/* === [Option] ===
	- posAlign : "center" or "pointer" ----- 활성화 되는 레이어의 위치 지정
	*/
	$.fn.toolTipLayer.defaults = {
		posAlign : "center"
	}

	// 레이어 뷰(상단과 동일한 동작을 하는 스크립트)
	$.fn.view = function(options){
		var option = $.extend({}, $.fn.view.defaults, options || {});

		return this.each(function(){
			var $this = ($(this).find("a").length > 0) ? $(this).find("a") : $(this)
			, tvCourse = option.targeting !== undefined;

			var targetDiv = $.map($this, function(value, index){
				return value.hash
			}).join();
			$(targetDiv).hide();

			if(tvCourse) var $targeting = $(option.targeting).hide();
			if( option.align == "center" ) alignPos();

			// 정렬 함수
			function alignPos(){
				var xPos = $(window).width()/2 - $(targetDiv).width()/2
				, yPos = $(window).height()/2 - $(targetDiv).height()/2;

				$(targetDiv).css({ left : xPos, top : yPos })
			}

			// 링크 HREF
			function hashEvent(eleID){
				if( !option.closeBtn ){
					if( eleID.hash ){
						if( $(eleID.hash).css("display") == "none" ) $(eleID.hash).show();
						else $(eleID.hash).hide();
					} else {
						if( $targeting.css("display") == "none") $targeting.show();
						else $targeting.hide();
					}
				} else {
					$targeting.show();
				}
			}

			// 링크클릭
			$this.bind("click", function(){
				hashEvent(this)

				return false;
			});

			// 닫기 버튼(ID일경우)
			if( $targeting ){
				$targeting.find(".close a").bind("click", function(){
					$(this).closest($targeting).hide();

					return false;
				});
			}
		});
	}
	/*
		closeBtn : 닫기 버튼 존애여부(true, false-기본은 버튼이 없는경우)
		targeting : ID로 해당 상세레이어로 적용할때("#아이디명 또는 .클래스명")
		align : 정렬 상태(기본은 left or center)
	*/
	$.fn.view.defaults = { closeBtn : false, align : "left" };

	// [---] 검정배경 레이어 [---]
	$.fn.layerScratch = function(options) {
		return this.each(function() {
			var $this = $(this), $obj = $this.data("layerScratch");

			if ($obj) {
				option = $.extend($obj.options, options);

				$obj.destroy();
			}

			$obj = new LayerScratch(this, options);
			$this.data("layerScratch", $obj)
		});
	}
	$.layerScratch = function(options) {
		return $("body").layerScratch(options).data("layerScratch");
	};

	// style
	var style = {
		blankCss : {
			position : "fixed",
			left : 0,
			top : 0,
			opacity : 0,
			backgroundColor : "#000"
		}
	};

	// LayerScratch 함수
	var LayerScratch = function(content, options) {
		this.option = $.extend({}, $.fn.layerScratch.defaults, options || {});

		this.isBody = content === document.body;
		this.$content = $(content);

		var $displayView = ( $(this.$content.attr("href")) && $(this.$content.attr("href")).next().hasClass("blankElement") ) ? $(this.$content.attr("href")).next() : false;
		this.$target = ( this.$content.attr("href") ) ? $(this.$content.attr("href")) : $(this.option.defaultTarget);

		if( $(window).height() <= this.$target.outerHeight() ){
			this.$targetParent = $("<div></div>").addClass("targetParent").css({ position : "fixed", "overflow-x" : "hidden","overflow-y" : "auto", width : "100%", height : "100%", zIndex : 9999 }).append(this.$target);
			this.$targetParent.appendTo(this.$content);
		}

		this.$createElement = ( $displayView.length ) ? $displayView : $("<div></div>").addClass("blankElement").css(style.blankCss).appendTo(this.$content);

		this.$targetResetH = this.$target.children().outerHeight(true);
		this.$targetClose = (this.$target.find(".btn_close a:last-child").length ) ? this.$target.find(".btn_close a:last-child") : false;
		this.$target.css({
			position : "fixed",
			opacity : 0
		});

		this.$createElement.css({
			zIndex : parseFloat(this.$target.css("z-index")) - 1
		});

		if( this.option.todayClose ){
			if( !$.cookie(this.option.todayClose.cookie) ){
				this.show();
			}

			this.todayEvent();
		} else {
			this.show();
		}

		/* 전체역역 클릭 */
		if( this.option.autoClose ){
			this.$createElement.bind("click", $.proxy(this.hide, this));
		}

		// 닫기 버튼 클릭
		if ( this.$targetClose ) {
			this.$targetClose.bind("click", $.proxy(this.hide, this));
		}
		// 닫기 아이콘 그외 버튼형 취소 및 닫기 버튼이 있을경우
		if( this.$target.find(".btn_inline_close").length ){
			this.$target.find(".btn_inline_close").bind("click", $.proxy(this.hide, this));
		}

		if( this.option.align == "center" ){
			// 브라우져 리사이즈
			$(window).bind("resize", $.proxy(this.resize, this));
		}

		$(window).bind("resize", $.proxy(this.bgresize, this));
	};
	// LayerScratch prototype
	LayerScratch.prototype = {
		show : function(){
			var that = this

			if( this.option.align == "center" ){
				if( this.isBody ){
					var layerLeft = ( $(window).width() < this.$target.outerWidth() ) ?
										0 : ($(window).width() / 2) - (this.$target.outerWidth() / 2)
					, layerTop = ( $(window).height() < this.$target.outerHeight() ) ?
										$(window).scrollTop() : ($(window).height() / 2) - (this.$target.outerHeight() / 2);
				} else {
					var layerLeft = ( this.$content.width() < this.$target.outerWidth() ) ?
										0 : (this.$content.width() / 2) - (this.$target.outerWidth() / 2)
					, layerTop = ( this.$content.height() < this.$target.outerHeight() ) ?
										this.$content.offset().top : (this.$content.outerHeight() / 2) - (this.$target.outerHeight() / 2);
				}
			} else {
				var layerLeft = parseFloat(this.$target.css("left"))
				, layerTop = parseFloat(this.$target.css("top"));
			}

			if( this.isBody ){
				this.$content.closest("body").addClass(that.option.nodeAddclass);
				this.$createElement.css({ width : $(document).width(), height : $(document).height() });
			} else {
				this.$content.addClass(that.option.nodeAddclass);
				this.$target.appendTo(this.$content);
				this.$createElement.css({ width : this.$content.width(), height : this.$content.height() });
			}

			if( $(window).height() <= this.$target.outerHeight() ){
				this.$targetParent.css({
					left : 0,
					top : layerTop
				})
				this.$target.css({
					left : layerLeft,
					top : 0
				});
			} else {
				this.$target.css({
					left : layerLeft,
					top : layerTop
				});
			}

			this.$target.show()
			this.$target.stop(true).animate({
				opacity : 1
			}, 500);
			this.$createElement.show().stop(true).animate({
				opacity : this.option.opacity
			}, 500);

			return that;
		},
		hide : function(){
			var that = this;

			( that.isBody ) ? that.$content.removeClass(that.option.nodeAddclass) : that.$content.closest("body").removeClass(that.option.nodeAddclass);

			this.$target.stop(true).animate({
				opacity : 0
			}, 500, function() {
				$(this).hide();

				if( $(window).height() < that.$target.outerHeight() ) that.$targetParent.hide();

				that.option.hideAfterFunc($(this));
			});

			this.$createElement.animate({
				opacity : 0
			}, 500, function() {
				$(this).hide();
			});

			if( this.option.todayClose && $(this.option.todayClose.node).prev(".input-check").length && $(this.option.todayClose.node).prev(".input-check").is(":checked") ){
				$.cookie(this.option.todayClose.cookie, true, { expires : this.option.todayClose.expires, path : "/" });
			}

			return false;
		},
		todayEvent : function(){
			var that = this
			, $button = $(this.option.todayClose.node);

			if( !that.option.todayClose.evtClick ){
				if( !$button.prev(".input-check").length ){
					$button.bind("click", function(){
						$.cookie(that.option.todayClose.cookie, true, { expires : that.option.todayClose.expires, path : "/" });

						that.hide();
					});
				}
			} else {
				// 체크박스 클릭
				$button.prev(".input-check").bind("click", function(){
					$.cookie(that.option.todayClose.cookie, true, { expires : that.option.todayClose.expires, path : "/" });

					that.hide();
				});

				// that.option.todayClose.node 클릭
				$button.bind("click", function(){
					$.cookie(that.option.todayClose.cookie, true, { expires : that.option.todayClose.expires, path : "/" });

					that.hide();
				});
			}
		},
		resize : function(){
			var that = this;

			if( this.isBody ){
				var layerLeft = $(window).scrollLeft() + (($(window).width() / 2) - (that.$target.outerWidth() / 2))
				, layerTop = $(window).scrollTop() + (($(window).height() / 2) - (that.$target.outerHeight() / 2));
			}

			if( $(window).height() <= this.$target.outerHeight() ){
				if( this.$target.parent(".targetParent").length != 0 ){
					this.$target.appendTo(this.$targetParent);
					this.$targetParent.css({
						left : 0,
						top : $(document).scrollTop() + 0,
						width : $(window).width()
					})
				} else {
					this.$targetParent = $("<div></div>").addClass("targetParent").css({ position : "fixed", "overflow-x" : "hidden","overflow-y" : "auto", width : "100%", height : "100%", zIndex : 9999 }).append(this.$target);
					this.$targetParent.appendTo("body");
					this.$targetParent.css({
						left : 0,
						top : $(document).scrollTop() + 0,
						width : $(window).width()
					})
				}

				this.$target.css({
					left : layerLeft,
					top : 0
				});
			} else {
				if( this.$target.closest(".targetParent").length ){
					this.$target.appendTo("body");
					this.$targetParent.remove();

				}

				if( this.isBody ){
					this.$target.css({
						left : layerLeft,
						top : layerTop
					});
				}
			}

			return that;
		},
		bgresize : function(){
			if( this.isBody ){
				this.$createElement.css({
					width : $(window).width(),
					height : $(window).height(),
					top : $(document).scrollTop()
				});
			} else {
				this.$createElement.css({
					width : this.$content.width(),
					height : this.$content.height()
				});
			}

			return this;
		},
		destroy : function(){
			if( this.$targetClose ) this.$targetClose.unbind("click");

			this.$createElement.remove();
			this.$content.removeData("layerScratch");
		}
	};
	/* === option ===
	- defaultTarget : ".target" ---- 레이어 ID 또는 Class, 버튼의 href가 없을경우 레이어
	- opacity : 0~1 ---- 레이어 회색배경 투명도(소수점으로 표시)
	- align : "center" or "left" ---- 레이어 정렬
	- autoClose : true ---- 레이어 회색배경 클릭할경우 레이어 숨김여부(true or false)
	- nodeAddclass : "scrollHidden" ---- defaultTarget에 들어갈 클래스명
	- todayClose : undefined or { node : ".target", cookie : "js-cookie-2019", expires : 1, evtClick : false } ---- 오늘하루보지않기 기능 node : label 태그, cookie : 쿠키명, expires : 쿠키 저장기간, evtClick : label, check 클릭시 숨김
	- hideAfterFunc : function ---- 레이어 숨김후 동작 함수
	*/
	$.fn.layerScratch.defaults = {
		defaultTarget : ".target",
		opacity : 0.3,
		align : "center",
		autoClose : true,
		nodeAddclass : "scrollHidden",
		todayClose : undefined,
		hideAfterFunc : function(){}
	};
})(jQuery);

// 토글 탭 및 슬라이드 스크립트
(function($){
	// 이미지 활성화
	$.fn.nodeToggleActive = function(option){
		var opt = $.extend({}, $.fn.nodeToggleActive.default, option || {});

		return this.each(function(){
			var $this = $(this) // 이미지
			, childNode = null;

			// 이미지가 여러개일경우
			if( $this.find("img").length ){
				var $btn = $this.find("img")
				, oldActive = null;

				// 버튼 클릭
				$btn.on("click", function(e){
					e.preventDefault();

					var index = $btn.index(this);

					// 이전 선택한 버튼
					if( oldActive && this != oldActive ){
						$(oldActive).parent().removeClass("active");
					}

					// 현재 활성화 버튼
					if( this != oldActive ){
						$(this).parent().addClass("active");
					}

					oldActive = this;

					// 요소 클릭후 실행
					opt.funcClickAfter(index);
				});
			} else { // 단독으로 사용할 경우
				// 부모 태그가 존재하는지 여부
				if( $this.prev().length || $this.next().length ){
					childNode = false;
				} else {
					childNode = true;
				}

				// 초기 로드후 실행
				opt.funcInitAfter($this);

				// 이미지 클릭
				$this.on("click", function(e){
					e.preventDefault();

					var index = $this.index(this);

					 // 부모태그내 이미지
					if( childNode ){
						if( $(this).parent().prop("tagName") == "DIV" ){
							if( !$(this).parent().hasClass("active") ){
								$(this).parent().addClass("active");
							} else {
								$(this).parent().removeClass("active");
							}
						} else {
							if( !$(this).parent().parent().hasClass("active") ){
								$(this).parent().parent().addClass("active");
							} else {
								$(this).parent().parent().removeClass("active");
							}
						}
					} else { // 이미지 단독
						if( !$(this).hasClass("active") ){
							$(this).addClass("active");
						} else {
							$(this).removeClass("active");
						}
					}

					// 요소 클릭후 실행
					opt.funcClickAfter($(this), index);
				});
			}
		});
	};
	/* === [Option] ===
	- funcInitAfter : "function" ----- 초기 로드후 함수 호출
	- funcClickAfter : "function" ----- 리스트 클릭후 함수 호출
	*/
	$.fn.nodeToggleActive.default = {
		funcInitAfter : function(node){},
		funcClickAfter : function(node, index){}
	};

	// 키워드 토굴
	$.fn.keywordToggle = function(options){
		var opt = $.extend({}, $.fn.keywordToggle.default, options || {});

		return this.each(function(){
			var $this = $(this)
			, $button = $this.find("button")
			, oldActive = null;

			// 초기값
			$button.each(function(i, v){
				if( $(v).hasClass("active") ){
					oldActive = $(v);
				}
			});

			// 버튼 클릭
			$button.on("click", function(e){
				e.preventDefault();

				// 현재 index 번호 추출
				var index = $button.index(this);

				// 이전 버튼
				if( oldActive && $(oldActive).hasClass("active") ){
					$(oldActive).removeClass("active");
				} else if( oldActive && this == oldActive && !$(oldActive).hasClass("active") ){
					$(oldActive).addClass("active");

					// 클릭 활성화 될경우 실행될 함수
					opt.funcClickAfter($(this), index);
				}

				// 현재 버튼
				if( this != oldActive ){
					$(this).addClass("active");

					// 클릭 활성화 될경우 실행될 함수
					opt.funcClickAfter($(this), index);
				}

				oldActive = this;
			});
		});
	}
	/* === option ===
	- funcClickAfter : "button" ~ ----- 버튼 클릭후 실행 함수
	*/
	$.fn.keywordToggle.default = {
		funcClickAfter : function(node, index){}
	};

	// 탭
	$.fn.tabType = function(option){
		var opt = $.extend({}, $.fn.tabType.default, option || {});

		return this.each(function(){
			var $this = $(this)
			, $link = $this.find(".tab")
			, active = opt.active
			, eventType = opt.eventType
			, oldActive = null;

			// 버튼 클릭
			$link.bind(eventType, function(e){
				e.preventDefault();

				// 클릭할경우 index값
				var index = $link.index(this);

				// 같은 탭 클릭했을경우 체크
				if( this != oldActive ){
					// 이전 탭
					if( oldActive ){
						if( $(oldActive).find("img").length ){
							$(oldActive).find("img")[0].src = $(oldActive).find("img")[0].src.replace("_on.", "_off.");
						} else {
							$(oldActive).parent().removeClass("active");
						}
						$(oldActive.hash).hide();
					}

					// 현재 탭
					if( $(this).find("img").length ){
						$(this).find("img")[0].src = $(this).find("img")[0].src.replace("_off.", "_on.");
					} else {
						$(this).parent().addClass("active");
					}
					$(this.hash).show();

					oldActive = this;
				}
			});

			// 초기 실행
			if( active <= $link.length ){
				$link.eq(active-1).trigger(eventType);
			} else {
				$link.eq(0).trigger(eventType);
			}
		});
	}
	/* === option ===
	- active : 1 ----- 탭활성화 숫자, 1부터 시작이며 클릭하는 탭 갯수만큼 적용되며 그 이상이 될경우 첫번째탭이 활성화됨
	- eventType : "click" ----- 이벤트 설정("click", "mouseenter")
	*/
	$.fn.tabType.default = {
		active : 1,
		eventType : "click"
	};

	// Accordion
	$.fn.accordionType = function(options){
		var opt = $.extend({}, $.fn.accordionType.defaults, options || {});

		return this.each(function(){
			var funcAcc = {}
			, $this = $(this)
			, $link = $this.find(".title");

			// 초기 실행
			funcAcc.init = function(){
				// 초기 메뉴 내용 숨김
				var oldActive = null;

				// 버튼 클릭
				$link.bind("click", function(){
					if( this != oldActive ){
						if( oldActive ){
							funcAcc.close( oldActive );
						}

						funcAcc.open( this );
					} else {
						if( opt.eventAuto ){
							if( $(this).next().css("display") != "none" ){
								funcAcc.close( this );
							} else {
								funcAcc.open( this );
							}
						}
					}

					oldActive = this;

					return false;
				});

				// 초기 활성화(active의 값이 있을경우)
				if( opt.active ){
					if( opt.active > 0 && opt.active <= $link.length ){
						$link.eq(opt.active - 1).trigger("click");
					} else {
						$link.eq(0).trigger("click");
					}
				}
			}

			// 내용 오픈
			funcAcc.open = function(eleId){
				$(eleId).parent().addClass("active");

				if( opt.effect == "normal" ){
					$(eleId).next().show();
				} else {
					$(eleId).next().slideDown("fast");
				}
			}

			// 내용 숨김
			funcAcc.close = function(eleId){
				$(eleId).parent().removeClass("active");

				if( opt.effect == "normal" ){
					$(eleId).next().hide();
				} else {
					$(eleId).next().slideUp("fast");
				}
			}

			// 초기 실행
			funcAcc.init();
		});
	};
	/* === option ===
	- effect : "normal" or "slide" ----- 내용이 노출될때 나오는 모션
	- active : null or Number ----- 1 ~ @ 입력가능하며 최대는 메뉴의 총갯수까지 적용(그 수를 넘으면 첫번째 메뉴가 활성화됨)
	- eventAuto : false or true ----- 메뉴 클릭시 같은메뉴를 클릭할때도 노출됨.
	*/
	$.fn.accordionType.defaults = {
		effect : "normal",
		active : null,
		eventAuto : false
	};

	// 기본 셀렉트박스를 이용한 이미지 셀렉트박스
	$.fn.select = function(option){
		var opt = $.extend({}, $.fn.select.defaults, option || {});

		return this.each(function(){
			var $this = $(this)
			, $select = $this.find(".select")
			, selectLength = $select.find("option").length
			, oldActive = null
			, timer = undefined;

			// 레이어 기본 스타일
			var style = {
				linkLayer : {
					position : "absolute",
					left : 0,
					border : "1px solid #ccc",
					background : "#fff",
					zIndex : 1000
				}
			};

			// 초기 셀렉트박스 숨김
			$select.hide();

			// 전체 wrap에 Css 추가
			$this.css({ position : "relative" });

			// 셀렉트박스 디자인 생성
			var ctElement = createElement();

			// data이 있을경우 기존 이벤트 제거
			if( $this.data("js-stSelect") ){
				$select.off("change");
				ctElement.ctlink.off("click");
				$(ctElement.ctLayerLink).off("click");
				$(ctElement.ctLayerLink).off("mouseenter mouseleave");
				$(document).off("click");
			}

			// 셀렉트 링크 클릭
			ctElement.ctlink.on("click", function(e){
				if( !$(this).parent().hasClass("active") ){
					// 활성화 되더있는 셀렉트 닫기
					allHideView();

					// 활성화
					showView();
				} else {
					// 비활성화
					hideView();
				}

				return false;
			});

			// 레이어 링크
			$(ctElement.ctLayerLink).on("click", function(e){
				if( !$(this).hasClass("disable") ){
					// Index 추출
					var index = $(ctElement.ctLayerLink).index(this);

					// 버튼 텍스트 적용
					ctElement.ctlink.text($(this).text());
					// 셀렉트박스 활성화
					ctElement.ctSelect.removeAttr("selected");
					ctElement.ctSelect.eq(index).attr("selected", "selected");

					// 검색등 셀렉트박스 다음에 나올 textarea 또는 input창 focus
					if( $this.find("textarea").length ) $this.find("textarea").trigger("focus");
					else if( $this.find(".input-text").length ) $this.find(".input-text").trigger("focus");

					// 비활성화
					hideView();

					// 다른걸 선택할경우 함수 실행
					if( this != oldActive ){
						opt.eventChangeFunc(ctElement.ctlink);
					}

					oldActive = this;
				}

				return false;
			});
			// 레이어 링크 마우스오버
			$(ctElement.ctLayerLink).on("mouseenter", function(){
				$(this).parent().addClass("link_active");
			});
			// 레이어 링크 마우스아웃
			$(ctElement.ctLayerLink).on("mouseleave", function(){
				$(this).parent().removeClass("link_active");
			});

			// select 비활성화
			if( opt.disable == true ){
				$select.attr({ disabled : "disabled" });
				ctElement.ctView.css({ opacity : 0.7 });
				ctElement.ctlink.attr({ href : "javascript:void(0)" }).css({ backgroundColor : "#eee", cursor : "default" });
				ctElement.ctlink.off("click");
				ctElement.ctlink.off("mouseenter mouseleave");
			}

			// 셀렉트박스 활성화
			function showView(){
				// 클래스 추가
				ctElement.ctlink.parent().addClass("active");
				ctElement.ctlink.addClass("on");
				// 최상위 부모에 z-index값 수정
				$this.css({ zIndex : 200 });

				// effect 적용
				if( opt.effect == "normal" ) ctElement.ctLayer.show();
				else ctElement.ctLayer.fadeIn();
			}

			// 셀렉트박스 비활성화
			function hideView(){
				// 클래스 삭제
				ctElement.ctlink.parent().removeClass("active");
				ctElement.ctlink.removeClass("on");
				// 최상위 부모에 z-index값 수정
				$this.css({ zIndex : 199 });

				// effect 적용
				if( opt.effect == "normal" ) ctElement.ctLayer.hide();
				else ctElement.ctLayer.fadeOut();
			};

			// 셀렉트박스 활성화 전체 닫기(문서내 셀렉트 비활성화)
			function allHideView(){
				$(".selectView").parent().css({ zIndex : 190 });
				$(".selectView").removeClass("active");
				$(".selectView").find("a").removeClass("on");
				$(".selectLayer").hide();
			}

			// 셀렉트 리스트
			function createElement(){
				// 레이어 하단 및 상단 여부
				var alignClassFlag = null;

				// 초기 삭제
				if( $this.data("js-stSelect") ){
					$this.find(".selectView").remove();
					$this.find(".selectLayer").remove();
				}

				// 레이어 상하단 정렬
				if( opt.alignItem == "top" ){
					alignClassFlag = "selectView_down";
				} else {
					alignClassFlag = "selectView_up";
				}

				// 셀렉트 생성 변수
				var $selectView = $("<div></div>").addClass("selectView " + alignClassFlag).css({ position : "relative" })
				, $viewLink = $("<a></a>").attr("href", "#").addClass("link")
				, $selectLayer = $("<ul></ul>").addClass("selectLayer").css(style.linkLayer)
				, $option = $select.find("option")
				, awLink = new Array
				, posTop = null;

				// 셀렉트 안에 내용 추가
				$this.append($selectView);
				$selectView.append($viewLink);
				// Effect Fade일경우 Icon태그 추가
				if( opt.effect == "fade" ){
					var $iconArrow = $("<span></span>").addClass("icon");
					$selectView.addClass("selectViewIcon").append($iconArrow);
				}
				// 셀렉트박스 활성화 내용 적용
				$option.each(function(i, v){
					if( $(v).is(":selected") ){
						$viewLink.text($option.eq(i).text());
					}
				});
				// li 리스트 생성
				for( var i=0; i<$option.length; i++ ){
					var $stLi = $("<li></li>").attr("data-name", $option.eq(i).val())
					, $stLink = ( !$option.eq(i).is(":disabled") ) ? $("<a></a>").attr("href", "#").text($option.eq(i).text()) : $("<span></span>").addClass("disable").text($option.eq(i).text());

					$stLi.append($stLink);
					$selectLayer.append($stLi);

					awLink.push($stLink[0]);
				};
				// 레이어 추가
				$this.append($selectLayer);

				// 버튼에 보더가 있을경우 체크후 높이값 적용
				if( parseFloat($selectView.css("border-width")) ){
					posTop = $selectView.outerHeight() - parseFloat($selectView.css("border-width"));
				} else {
					posTop = $selectView.outerHeight();
				}

				// 레이어 활성화 위치 지정
				if( opt.alignItem == "top" ){
					$selectLayer.css({ top : posTop, width : $selectView.innerWidth() }).hide();
				} else {
					$selectLayer.css({ bottom : posTop, width : $selectView.innerWidth() }).hide();
				}

				// 리스트 활성화 카운트
				if( opt.viewCount != "auto" ){
					if( opt.viewCount < $selectLayer.find("li").length ){
						$selectLayer.css({ overflow : "auto", height : Math.floor($selectLayer.outerHeight()/$selectLayer.find("li").length) * opt.viewCount });
					}
				}

				return { ctView : $selectView, ctlink : $viewLink, ctLayer : $selectLayer, ctLayerLink : awLink, ctSelect : $option };
			};

			// 전체 클릭(레이어 비활성화)
			$(document).on("click", function(e){
				hideView();
			});

			// data 적용
			$this.data("js-stSelect", true);
		});
	};
	/* ◈◈◈ option ◈◈◈
	- effect : "normal" or "fade" ----- 모션 효과
	- disable : true or false ----- 셀렉트박스 리스트 비활성화 유무
	- alignItem : "top" or "bottom" ----- 활성화 레이어 상하 정렬
	- viewCount : "auto" or 숫자 ----- 목록에서 노출될 리스트 갯수(스크롤 생성)
	- eventChangeFunc ----- 이벤트 "change" 추가 유무
	*/
	$.fn.select.defaults = {
		effect : "normal",
		disable : false,
		alignItem : "top",
		viewCount : "auto",
		eventChangeFunc : function(link){}
	};

	// 컬러값
	var colorPlckerPalette = [
		"000000", "434343", "666666", "999999", "B7B7B7", "CCCCCC", "D9D9D9", "EFEFEF", "F3F3F3", "FFFFFF",
		"980000", "FF0000", "FF9900", "FFFF00", "00FF00", "00FFFF", "4A86E8", "0000FF", "9900FF", "FF00FF",
		"E6B8AF", "F4CCCC", "FCE5CD", "FFF2CC", "D9EAD3", "D0E0E3", "C9DAF8", "CFE2F3", "D9D2E9", "EAD1DC",
		"DD7E6B", "EA9999", "F9CB9C", "FFE599", "B6D7A8", "A2C4C9", "A4C2F4", "9FC5E8", "B4A7D6", "D5A6BD",
		"CC4125", "E06666", "F6B26B", "FFD966", "93C47D", "76A5AF", "6D9EEB", "6FA8DC", "8E7CC3", "C27BA0",
		"A61C00", "CC0000", "E69138", "F1C232", "6AA84F", "45818E", "3C78D8", "3D85C6", "674EA7", "A64D79",
		"85200C", "990000", "B45F06", "BF9000", "38761D", "134F5C", "1155CC", "0B5394", "351C75", "741B47",
		"5B0F00", "660000", "783F04", "7F6000", "274E13", "0C343D", "1C4587", "073763", "20124D", "4C1130"
	]
	// 컬러 추출
	$.fn.colorPicker = function(option){
		var opt = $.extend({}, $.fn.colorPicker.default, option || {});

		return this.each(function(){
			var $this = $(this)
			, $input = $this.find(".input_text")
			, inputValue = null
			, colorValue = null
			, layerActive = null;

			// 컬러 레이어 생성
			var $layer = createColorLayer()
			, $layerColor = $layer.find("a");

			// 초기에 값이 들어가있을경우 배경색 지정
			if( opt.valueShow ){
				// 대문자로 변환
				$input.val( $input.val().toUpperCase() );
				// 배경색 추가
				$input.css({ backgroundColor : "#" + $input.val() });
			}

			// 레이어 포지션 위치
			$layer.css({ top : $input.outerHeight() })
			if( $input.offset().left + $layer.outerWidth() > $(window).width() ){
				$layer.css({ left : "auto", right : 0 })
			}
			if( $input.offset().top + $input.outerHeight() + $layer.outerHeight() > $(document).height() ){
				$layer.css({ top : "auto", bottom : $input.outerHeight() })
			}

			// 전체 선택
			$this.on("click", function(){
				return false;
			});

			// Input Focusin
			$input.bind("focusin", function(){
				if( $layer.css("display") == "none" ){
					// 다른 컬러레이어가 활성화 될경우
					$(".color_picker_layer").each(function(i, v){
						if( $(v).css("display") != "none" ){
							$(v).fadeOut();
						}
					});

					$layer.fadeIn();
				}
			});

			// Input Focusin
			$input.bind("focusout", function(){
				// value값이 없을경우
				if( !$(this).val().length && $(this).attr("style") ){
					$(this).css("backgroundColor", "#" + colorPlckerPalette[9]);
				}
			});

			// input change
			$input.bind("change keyup paste", function(){
				$(this).attr("value", $(this).val().replace(/[^a-zA-Z0-9]/gi, ""));
				$(this).val( $(this).val().replace(/[^a-zA-Z0-9]/gi, "") );

				// 직접 작성했을경우 6자리일경우
				if( $(this).val().length == $(this).attr("maxlength") ){
					$(this).css("backgroundColor", "#" + $(this).val());
				}
			});

			// 컬러 레이어 클릭
			$layer.bind("click", function(e){
				e.preventDefault();

				layerActive = true;
			});

			// 컬러 레이어 버튼 클릭
			$layerColor.bind("click", function(e){
				e.preventDefault();

				colorValue = codeMethodChange( $(this).attr("style") );

				if( opt.valueShow ){
					$input.val( colorValue );
				}
				$input.css("backgroundColor", $(this).css("background-color"));

				// 안보이게
				$layer.fadeOut();
			});

			// 전체 클릭
			$(window).on("click", function(){
				if( $layer.css("display") != "none" ){
					$layer.fadeOut();
				}
			});

			// 배경 코드 추출
			function codeMethodChange(opt){
				var colorValue = opt;

				// 익스일경우 rgb로 표현
				if( colorValue.indexOf("rgb") != -1 ){
					colorValue = methodChange(colorValue);
				}

				colorValue = colorValue.split("#")[1];
				colorValue = colorValue.split(";")[0];

				return colorValue;
			}

			// Rgb 값을 코드값으로 변경
			function methodChange(value){
				var rgbColor = value.replace( /[^%,.\d]/g, "" )
				, rgbArr = rgbColor.split(",")
				, totalRgbColor = null;

				for( var i=0; i<rgbArr.length; i++ ){
					if( !totalRgbColor ){
						if( Number(rgbArr[i]).toString(16) == 0 ){
							totalRgbColor = "00";
						} else {
							totalRgbColor = Number(rgbArr[i]).toString(16);
						}
					} else {
						if( Number(rgbArr[i]).toString(16) == 0 ){
							totalRgbColor += "00";
						} else {
							totalRgbColor += Number(rgbArr[i]).toString(16);
						}
					}
				}

				totalRgbColor = "#" + totalRgbColor + ";";

				return totalRgbColor;
			}

			// 레이어 생성
			function createColorLayer(){
				var $colorLayer = $("<div />").addClass("color_picker_layer")
				, $colorLayerTitle = $("<p />").addClass("title").text("컬러값")
				, $colorLayerIn = $("<div />").addClass("color");

				for( var i=0; i<80; i++){
					$colorLayerIn.append(
						$("<a href='#'></a>").attr("style", "background:#" + colorPlckerPalette[i] + ";")
					);
				}

				$colorLayer.append( $colorLayerTitle );
				$colorLayer.append( $colorLayerIn )

				$this.append( $colorLayer );

				return $colorLayer;
			}
		});
	}
	/* === option ===
	- valueShow : false ----- 컬러값만 적용 여부
	*/
	$.fn.colorPicker.default = {
		valueShow : false
	};

	// 달력 스크립트
	$.fn.datepickerEach = function(option){
		var opt = $.extend({}, $.fn.datepickerEach.defaults, option);

		return this.each(function(i, v){
			var $this = $(this) // 전체영역
			, $input = $this.find(".input_text") // 선택할 Input
			, $del = $this.find(".btn_del") // 데이터 삭제 버튼
			, $hidden = $this.find("input[type=hidden]") // 데이터가 저장될 Hidden Input
			, $str = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/); // 날짜형식체크 정규식("0000-00-00")

			// 초기값 활성화
			if( opt.activeDate ){
				$input.val(opt.activeDate);
				$hidden.val(opt.activeDate);
			}

			// Input에 직접 작성할수있을경우
			if( !$input.attr("readonly") ){
				// Input 포커스인 이벤트
				$input.bind("change", function(){
					// Input값이 달력형식이 아닐경우
					if( !$str.test(this.value) ){
						alert("달력형식의 값으로 다시 입력해주세요.");
						// Hidden값 초기화
						$hidden.val("");
					}
				});
			}

			// 달력
			$input.datepicker({
				showOtherMonths: true,
				selectOtherMonths: true,
				showAnim : "fadeIn",
				dateFormat : "yy-mm-dd",
			    altField : "#" + $hidden.attr("id")
			});

			// 삭제 버튼 클릭
			$del.bind("click", function(){
				// Input값이 있을경우
				if( !$input.val() == "" ){
					// Input값 초기화
					$input.val("");
					// Hidden값 초기화
					$hidden.val("");
				}
			});
		});
	}
	/*	=== option ===
	- activeDate : "0000-00-00" ----- 날짜형태의 값
	*/
	$.fn.datepickerEach.defaults = {
		activeDate : null
	}
})(jQuery);

// 드래그 및 노드 이동
(function($){
	// 목록 드래그 기능
	$.fn.sortTable = function(option){
		// option
		var opt = $.extend({}, $.fn.sortTable.default, option);

		return this.each(function(){
			var $this = $(this)
			, $listNode = $this.find(opt.moveNode) // 이동할 리스트
			, $btnMove = $listNode.find(".btn_move") // 드래그 버튼
			, $inputHidden = $listNode.find("input[name=js_default_sort]") // 리스트별 Input Hidden value
			, $etcNode = ( opt.etcNode ) ? $(opt.etcNode) : null // 예외 요소
			, nodeActive = null
			, nodeActiveClass = null
			, resultPos = null
			, tempNode = null
			, nodeHeightArr = []
			, nodeHeightTotalArr = [];

			// 리스트별 idx 정렬
			if( opt.moveNode == "tr" ){
				$this.find("tbody " + opt.moveNode).addClass("target");

				$listNode.each(function(i, v){
					if( $(v).find("td").attr("rowspan") ){
						var rowspanTotal = parseFloat($(v).find("td").attr("rowspan"));

						for( var j=i+1; j<i+rowspanTotal; j++ ){
							$listNode.eq(j).removeClass("target")
						}
					}
				});

				$listNode = $this.find(".target");
			} else {
				$listNode.addClass("target");
			}

			// 높이값 추출
			nodeHeightResult();

			// 초기 실행
			opt.funcAfterFirst();

			// 활성화 클래스
			if( opt.moveNode.indexOf(".") != -1 ){
				nodeActive = "class";
				nodeActiveClass = opt.moveNode.split(".")[1];
			} else {
				nodeActive = "tag";
				nodeActiveClass = opt.moveNode;
			}

			// 최상단 이동 버튼
			if( $listNode.find(".btn_prev").length ){
				var $btnPrevFirst = $listNode.find(".btn_prev");

				// 최상단 이동 버튼 클릭
				$btnPrevFirst.on("click", function(e){
					var index = $btnPrevFirst.index(this);

					if( index == 0 ){
						alert("현재 게시물은 최상단에 위치해 있어 더이상 이동할 수 없습니다.");
					} else {
						// 이동할 노드 선택
						tempNode = targetMove({ target : $(this).closest(opt.moveNode) });

						// 이동
						if( opt.moveNode.indexOf(".") != -1 ){
							tempNode.children().insertBefore( $listNode.eq(0) );
						} else {
							tempNode.find("tbody").children().insertBefore( $listNode.eq(0) );
						}

						// 이동후 필요없는 레이어 삭제
						tempNode.remove();

						// 리스트 재정렬
						againReSort();
					}

					e.preventDefault();
				});
			}

			// 상단 이동 버튼
			if( $listNode.find(".btn_prevNum").length ){
				var $btnPrev = $listNode.find(".btn_prevNum");

				// 상단 이동 버튼 클릭
				$btnPrev.on("click", function(e){
					var index = $btnPrev.index(this);

					if( index == 0 ){
						alert("현재 게시물은 최상단에 위치해 있어 더이상 이동할 수 없습니다.");
					} else {
						// 이동할 노드 선택
						tempNode = targetMove({ target : $(this).closest(opt.moveNode) });

						// 이동
						if( opt.moveNode.indexOf(".") != -1 ){
							tempNode.children().insertBefore( $listNode.eq(index-1) );
						} else {
							if( index-2 >= 0 ){
								tempNode.find("tbody").children().insertBefore( $listNode.eq(index-1) );
							} else {
								tempNode.find("tbody").children().insertBefore( $this.find(".table tbody " + opt.moveNode).eq(0) );
							}
						}

						// 이동후 필요없는 레이어 삭제
						tempNode.remove();

						// 리스트 재정렬
						againReSort();
					}

					e.preventDefault();
				});
			}

			// 하단 이동 버튼
			if( $listNode.find(".btn_nextNum").length ){
				var $btnNext = $listNode.find(".btn_nextNum");

				// 하단 이동 버튼 클릭
				$btnNext.on("click", function(e){
					var index = $btnNext.index(this);

					if( index == $listNode.length-1 ){
						alert("현재 게시물은 최하단에 위치해 있어 더이상 이동할 수 없습니다.");
					} else {
						// 이동할 노드 선택
						tempNode = targetMove({ target : $(this).closest(opt.moveNode) });

						// 이동
						if( opt.moveNode.indexOf(".") != -1 ){
							tempNode.children().insertAfter( $listNode.eq(index+1) );
						} else {
							if( $listNode.eq(index+2).length ){
								tempNode.find("tbody").children().insertBefore( $listNode.eq(index+2) );
							} else {
								tempNode.find("tbody").children().insertAfter( $this.find(".table tbody " + opt.moveNode).eq($this.find(".table tbody " + opt.moveNode).length-1) );
							}
						}

						// 이동후 필요없는 레이어 삭제
						tempNode.remove();

						// 리스트 재정렬
						againReSort();
					}

					e.preventDefault();
				});
			}

			// 최하단 이동 버튼
			if( $listNode.find(".btn_next").length ){
				var $btnNextLast = $listNode.find(".btn_next");

				// 최하단 이동 버튼 클릭
				$btnNextLast.on("click", function(e){
					var index = $btnNextLast.index(this);

					if( index == $listNode.length-1 ){
						alert("현재 게시물은 최하단에 위치해 있어 더이상 이동할 수 없습니다.");
					} else {
						// 이동할 노드 선택
						tempNode = targetMove({ target : $(this).closest(opt.moveNode) });

						// 이동
						if( opt.moveNode.indexOf(".") != -1 ){
							tempNode.children().insertAfter( $listNode.eq($listNode.length-1) );
						} else {
							tempNode.find("tbody").children().insertAfter( $this.find(".table tbody " + opt.moveNode).eq($this.find(".table tbody " + opt.moveNode).length-1) );
						}

						// 이동후 필요없는 레이어 삭제
						tempNode.remove();

						// 리스트 재정렬
						againReSort();
					}

					e.preventDefault();
				});
			}

			// 마우스 다운
			$btnMove.bind("mousedown", function(e){
				var that = this
				, downPosX = e.clientX
				, downPosY = e.clientY
				, thisDownPosY = downPosY - $this.offset().top
				, nodePosY = downPosY - $(this).closest(opt.moveNode).offset().top
				, resetPosY = thisDownPosY - nodePosY
				, listPosSort = null
				, oldListPosSort = null;

				// 이동할 태그 생성
				//var moveNodeCreate = $("<div />").addClass("pos_move_temp").appendTo( $this );
				//moveNodeCreate.css({ position : "absolute", left : 0, top : resetPosY, width : "100%", zIndex : 100 }).append( $(this).closest(opt.moveNode) );
				// 이동할 노드 선택
				var moveNodeCreate = targetMove({ target : $(this).closest(opt.moveNode) });
				//moveNodeCreate.css({ position : "absolute", left : 0, top : resetPosY, width : "100%", backgroundColor : "#fff", zIndex : 100 }).append( $(this).closest(opt.moveNode) );
				moveNodeCreate.css({ position : "absolute", left : 0, top : resetPosY, width : "100%", backgroundColor : "#fff", zIndex : 100 });

				// 선택한 리스트 Css 및 Class 적용
				$(this).closest(opt.moveNode).addClass(nodeActiveClass + "_active");

				// 선택된 노드 제외한 나머지 .column 리스트
				if( opt.moveNode.indexOf(".") != -1 ){
					var $columns = $this.find(".target").not("." + nodeActiveClass + "_active");
				} else {
					var $columns = $this.find("tbody .target").not("." + nodeActiveClass + "_active");
				}

				// 복사 엘리먼트 생성
				var $createList = createListCopy({ type : nodeActive, node : nodeActiveClass, text : $(this).closest(opt.moveNode).html() });
				$this.append( $createList );
				$createList.addClass($(this).closest(opt.moveNode).attr("class").split(" ")[1]).show();

				// 리스트별 사이 체크(Index)
				listPosSort = listScopePos({ posX : resetPosY });
				// 복사된 엘리먼트 이동
				$columns.eq(listPosSort).before( $createList );

				// 마우스 이동
				$(window).bind("mousemove", function(e){
					var movePosX = e.clientX
					, movePosY = e.clientY
					, thisMovePosY = movePosY - $this.offset().top
					, moveTargetPosY = thisMovePosY - nodePosY;

					// 리스트 이동 영역 체크
					var allDragScope = allScope({ posY : moveTargetPosY });
					if( allDragScope ){
						//$(that).closest(opt.moveNode).css({ top : moveTargetPosY });
						moveNodeCreate.css({ top : moveTargetPosY });

						// 리스트별 사이 체크(Index)
						listPosSort = listScopePos({ posX : moveTargetPosY });

						// listPosSort Index가 변경될경우만 실행
						if( listPosSort != oldListPosSort ){
							if( listPosSort == $columns.length ){
								if( opt.moveNode.indexOf(".") != -1 ){
									$columns.eq($columns.length-1).after( $createList );
								} else {
									$this.find(".table tbody " + opt.moveNode).eq($this.find(".table tbody " + opt.moveNode).length-1).after( $createList );
								}
							} else {
								$columns.eq(listPosSort).before( $createList );
							}
						}

						oldListPosSort = listPosSort;
					}
				});
				// 마우스 업
				$(window).bind("mouseup", function(e){
					$(window).unbind("mousemove");
					$(this).unbind("mouseup");

					// 복사된 엘리먼트 삭제
					$createList.remove();

					// 노드 비활성화
					$(that).closest(opt.moveNode).removeClass(nodeActiveClass + "_active").removeAttr("style");

					// 변경된 노드 한번 실행
					if( opt.moveNode.indexOf(".") != -1 ){
						if( listPosSort == $columns.length ){
							$columns.eq($columns.length-1).after( $(that).closest(opt.moveNode) );
						} else {
							$columns.eq(listPosSort).before( $(that).closest(opt.moveNode) );
						}
					} else {
						if( listPosSort == $columns.length ){
							//$columns.eq($columns.length-1).after( $(that).closest(opt.moveNode) );
							$this.find(".table tbody " + opt.moveNode).eq($this.find(".table tbody " + opt.moveNode).length-1).after( moveNodeCreate.find("tbody").children() );
						} else {
							//moveNodeCreate.find("tbody")
							$columns.eq(listPosSort).before( moveNodeCreate.find("tbody").children() );

							//$this.find(".table tbody " + opt.moveNode).eq($this.find(".table tbody " + opt.moveNode).length-1).before( moveNodeCreate.find("tbody").children() );
						}
					}

					moveNodeCreate.remove();

					// 리스트 재정렬
					againReSort();
				});

				return false;
			});

			// 전체 영역 범위
			function allScope(m){
				var listHeight = nodeHeightTotalArr[$listNode.length]
				, scopePosY = (listHeight * $listNode.length) + (( $etcNode && $etcNode.length ) ? $etcNode.outerHeight() : 0)
				, totalPosY = scopePosY - $listNode.outerHeight();

				if( $etcNode && $etcNode.length ){
					if( m.posY < $etcNode.outerHeight() || m.posY >= totalPosY ){
						resultPos = false;
					} else {
						resultPos = true;
					}
				} else {
					if( m.posY <= 0 || m.posY >= totalPosY ){
						resultPos = false;
					} else {
						resultPos = true;
					}
				}

				return resultPos;
			}

			// 리스트와의 사이 영역
			function listScopePos(m){
				var $columnList = $this.find(".target").not("." + nodeActiveClass + "_active")
				, currentPosY = m.posX
				, listSortPos = null;

				var columnHeight = $this.find(".target").outerHeight();

				for( var i=0; i<=$columnList.length; i++ ){
					if( $etcNode ){
						if( currentPosY >= $etcNode.outerHeight()+((nodeHeightTotalArr[i])-(nodeHeightArr[i]/2)) &&
							currentPosY <= $etcNode.outerHeight()+((nodeHeightTotalArr[i+1])-(nodeHeightArr[i+1]/2)) ){

							return listSortPos = i;
						}
					} else {
						if( currentPosY >= (columnHeight*i)-(columnHeight/2) && currentPosY <= (columnHeight*i)+(columnHeight/2) ){
							return listSortPos = i;
						}
					}
				}
			}

			// 복사될 리스트 생성
			function createListCopy(m){
				var listType = m.type
				, listNode = m.node
				, listText = m.text;

				if( nodeActive == "class" ){
					var columns = $("<div></div>").addClass(listNode + " disabled")
						.append( listText )
				} else {
					var columns = $("<" + opt.moveNode + "></" + opt.moveNode + ">").addClass(listNode + " disabled")
						.append( listText )
				}

				return columns;
			}

			// 리스트 재정렬
			function againReSort(){
				$listNode = $this.find(".target"); // 이동할 리스트
				$btnPrevFirst = $listNode.find(".btn_prev"); // 최상단 버튼
				$btnPrev = $listNode.find(".btn_prevNum"); // 상단 버튼
				$btnNext = $listNode.find(".btn_nextNum"); // 하단 버튼
				$btnNextLast = $listNode.find(".btn_next"); // 최하단 버튼
				$inputHidden = $listNode.find("input[name=js_default_sort]"); // Input Hidden

				// Input Hidden value
				$inputHidden.each(function(i, v){
					$(this).val(i+1);
				});

				// 리스트별 idx 정렬
				$listNode.each(function(i, v){
					$(this).attr({ value : i+1 });
				});

				// 높이값 추출
				nodeHeightResult();

				// 이동후 실행
				opt.funcAfterMoveLast({ node : $listNode });
			}

			// 현재 리스트
			function targetMove(m){
				var $target = m.target
				, $targetCopy = $target
				, $targetCopyArr = []
				, $tempCreate = $("<div />").addClass("target_temp").appendTo( $this.closest(".form") );

				// 이동할 노드가 클래스가 아닌 테이블일경우
				if( $target.is("tr") ){
					var $targetSpan = parseFloat($target.find("td").attr("rowspan"));
					var trTableForm = $("<div />").addClass("create_table")
						.append(
							$("<table />")
								.append(
									$("<colgroup />")
										.append(
											$this.find("colgroup").html()
										)
								)
								.append(
									$("<tbody />")
								)
						);

					$tempCreate.append( trTableForm );

					if( $targetSpan ){
						$targetCopyArr.push( $targetCopy )

						for( var i=0; i<$targetSpan-1; i++ ){
							$targetCopyArr.push( $targetCopy.next() );

							$targetCopy = $targetCopy.next();
						}

						for( var j=0; j<$targetCopyArr.length; j++ ){
							trTableForm.find("tbody").append( $targetCopyArr[j] );
						}
					} else {
						$(".target_temp").find("tbody").append( $target );
					}
				} else {
					$tempCreate.append( $target );
				}

				return $tempCreate;
			}

			// 리스트 높이값 추출
			function nodeHeightResult(){
				var result = 0
				, totalResult = 0;

				nodeHeightArr.push( result );
				nodeHeightTotalArr.push( totalResult );

				for( var i=0; i<$listNode.length; i++ ){
					if( parseFloat($listNode.eq(i).find("td").attr("rowspan")) ){
						$listNode.eq(i).find("td").each(function(i, v){
							if( $(v).attr("rowspan") ){
								result = $(v).outerHeight();
							}
						});

						nodeHeightArr.push( result );
					} else {
						nodeHeightArr.push( $listNode.eq(i).outerHeight() );
					}
				}

				for( var i=0; i<$listNode.length; i++ ){
					if( parseFloat($listNode.eq(i).find("td").attr("rowspan")) ){
						totalResult += $listNode.eq(i).outerHeight();

						for( var j=0; j<parseFloat($listNode.eq(i).find("td").attr("rowspan"))-1; j++ ){
							totalResult += $listNode.eq(i).next().outerHeight();
						}

						nodeHeightTotalArr.push( totalResult );
					} else {
						totalResult += $listNode.eq(i).outerHeight();

						nodeHeightTotalArr.push( totalResult );
					}
				}
			}
		});
	}
	/*
		=== options ===
		etcNode : "클래스 이름" ----- 이동할 순수영역을 제외한 필요없는 노드 클래스
		funcAfterFirst : function ----- 초기 실행
		funcAfterMoveLast : function ---- 요소가 이동후 싱핼
	*/
	$.fn.sortTable.default = {
		moveNode : ".unit",
		etcNode : null,
		funcAfterFirst : function(){},
		funcAfterMoveLast : function(m){}
	}
})(jQuery);

// 외부 라이브러리 및 플러그인
(function($){
	// jQuery Ui 달력 Option
	$.datepicker.setDefaults({
	    dateFormat: 'yymmdd',
	    prevText: '이전 달',
	    nextText: '다음 달',
	    monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
	    monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
	    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
	    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
	    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		changeYear : true,
		changeMonth : true,
		showMonthAfterYear: true,
	    yearSuffix: ' / ',
		showButtonPanel : true,
		currentText : "오늘",
		closeText : "닫기"
	});
})(jQuery);

