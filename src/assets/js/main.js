


const groupElem = document.querySelectorAll('.group__name'); //название группы
const groupPagesWrap = document.querySelector('.group-pages'); // страницы группы
const groupIdInput = document.querySelector('.add-page-form__group-id'); // id группы в инпуте
const groupNameInput = document.querySelector('.add-page-form__group-name'); // имя группы в инпуте
const addPageForm = document.querySelector('.add-page-form'); // форма добавления страницы
const pageHeading = document.querySelector('.content__middle h2'); // заголовок страницы
const compareHeading = document.querySelector('.content__right h2'); // заголовок страницы в сравнении
const serviceLoader = document.querySelector('.loading-wrap.loading-mask');
const progressStage = document.querySelector('.progress__stage'); // шкала загрузки
const deleteGroupBtn = document.querySelectorAll('.group .btn-delete'); // кнопка удаления группы
const progressLine = document.querySelector('.progress-line'); // индикатор заполнения загрузки
const progressBarPageName = document.querySelector('.progress-bar__pagename'); // имя страницы в поле загрузки

let notifyList = []; // список уведомлений

const leftCompare = document.getElementById("outputOriginal");
const rightCompare = document.getElementById("output");
const leftCompareTitle = document.querySelector('.diff-container__left h4');
const rightCompareTitle = document.querySelector('.diff-container__right h4');
const leftFrameWrap = document.querySelector(".frame-wrap-left");
const rightFrameWrap = document.querySelector(".frame-wrap-right");
const leftCompareLoader = document.querySelector(".diff-container__left .loading-mask");
const rightCompareLoader = document.querySelector(".diff-container__right .loading-mask");

const notifyItems = document.querySelectorAll('.notify-item'); // уведомления
let notifyCount = notifyItems.length; // количество уведомлений

const ver1Date = document.getElementById("ver1-date");
const ver2Date = document.getElementById("ver2-date");
const comparePageID = document.querySelector('.compare-form__page-id');
const dateInputsVersions = document.querySelectorAll('.page-versions-list');
const notifyBtn = document.querySelector('.btn-notify');
const siteMask = document.querySelector('.content-mask');
const leftSidebar = document.querySelector('.left-sidebar');

let curPage = '';
let versionItems;

if(notifyBtn){
	notifyBtn.addEventListener('click', function(){
		siteMask.classList.add('active');
		leftSidebar.classList.add('active');
	});
}	
siteMask.addEventListener('click', function(){
	siteMask.classList.remove('active');
	leftSidebar.classList.remove('active');
});

notifyItems.forEach((item)=>{
	let notifyItem = item;
	item.addEventListener('click', function(){
		checkVersionsFromNotify(notifyItem);
	});
})


// сбрасывает блок сравнения
function ResetCompareBlock (){
	ver1Date.value = '';
	ver2Date.value = '';
	
	compareHeading.innerText = 'Сравнение версий страницы';
	
	dateInputsVersions.forEach((elem)=>{
		elem.innerHTML = '';
	});
	
	leftCompareTitle.innerText = 'Версия не выбрана';
	rightCompareTitle.innerText = 'Версия не выбрана';
	
	leftCompare.innerHTML = '';
	rightCompare.innerHTML = '';
	
	leftFrameWrap.innerHTML = '';
	rightFrameWrap.innerHTML = '';
}

function viewMetaPageInfo(frameBlock){
	let infoBlock = '<div class="schema-products">';
	
	const title = frameBlock.document.querySelector('title').innerText;
	const description = frameBlock.document.querySelector('meta[name="description"]').getAttribute('content');
	const canonical = frameBlock.document.querySelector('link[rel="canonical"]').getAttribute('href');
	
	infoBlock += '<div class="tag-info"><strong>Title:</strong> '+ title +'</div>';
	infoBlock += '<div class="tag-info"><strong>Description:</strong> '+ description +'</div>';
	infoBlock += '<div class="tag-info"><strong>Canonical:</strong> '+ canonical +'</div>';
	
	infoBlock += '</div>';
	return infoBlock;
}

// выводит информацию о микроразметке в блок сравнения 
function viewSchemaInfo(schemaType, frameBlock){
	let infoBlock = '<div class="schema-products">';
	
	const schemaScripts = frameBlock.document.querySelectorAll('script[type="application/ld+json"]');

	schemaElems = [];
	schemaScripts.forEach((elem)=>{
		if(elem.innerText.includes(schemaType) && !elem.innerText.includes('document.querySelector')){
			schemaElems.push(elem);
		}	
	})
	if(schemaElems.length > 0){
		infoBlock += '<div class="schema-count">Разметка '+ schemaType +': '+ schemaElems.length +' элементов</div>';
	}
	schemaElems.forEach((elem)=>{
			
			infoBlock += '<div class="schema-product">'
			
			const explodedElem = elem.innerText.split('",')
			explodedElem.forEach((elem)=>{
				infoBlock += '<div>'+ elem +'</div>';
			})
			
			infoBlock += '</div>';
		
	})
	
	infoBlock += '</div>';
	
	return infoBlock;
}

function viewAttrSchemaInfo(schemaType, frameBlock){

	switch(schemaType){
		case 'FAQPage':
			const faqItems = frameBlock.document.querySelectorAll('*[itemtype="https://schema.org/Question"]');
			if(faqItems.length > 0){
				let infoBlock = '<div class="schema-products">';
				infoBlock += '<div class="schema-count">Разметка '+ schemaType +': '+ faqItems.length +' элементов</div>';
				faqItems.forEach((elem)=>{
					const question = elem.querySelector('*[itemprop="name"]');
					const answer = elem.querySelector('*[itemtype="https://schema.org/Answer"]');
					
					infoBlock += '<div class="schema-product">';
					infoBlock += '<div class="schema-name"><strong>Вопрос:</strong>'+ question.innerHTML +'</div>';
					infoBlock += '<div class="schema-name"><strong>Ответ:</strong>'+ answer.innerHTML +'</div>';
					infoBlock += '</div>';
				});
				
				infoBlock += '</div>';
				
				return infoBlock;
			} else {
				return false;
			}
			
			break;
		default: 
			return false;
	}
	
	
}

// собирает всю информацию из фрейма
function getFormattedVersionContent (frameItem){
	let textData = '<div class="data-text-blocks">';
					
	robotsBlock = frameItem.document.querySelector('.robots-block');
	sitemapBlock = frameItem.document.querySelector('.sitemap-block');
	
	if(robotsBlock){
		textData += '<pre style="word-wrap: break-word; white-space: pre-wrap;">'+ robotsBlock.innerHTML +'</pre>';
	} else if(sitemapBlock){
		textData += sitemapBlock.innerHTML;
	} else {
		textData += viewMetaPageInfo(frameItem);
		textData += viewSchemaInfo('WebSite', frameItem);
		textData += viewSchemaInfo('WPHeader', frameItem);
		textData += viewSchemaInfo('WPFooter', frameItem);
		textData += viewSchemaInfo('MedicalOrganization', frameItem);
		textData += viewSchemaInfo('MedicalClinic', frameItem);
		textData += viewSchemaInfo('BreadcrumbList', frameItem);
		textData += viewSchemaInfo('MedicalScholarlyArticle', frameItem);
		textData += viewSchemaInfo('LocalBusiness', frameItem);
		textData += viewSchemaInfo('Product', frameItem);
		textData += viewSchemaInfo('Physician', frameItem);
		
		if(viewAttrSchemaInfo('FAQPage', frameItem)){
			textData += viewAttrSchemaInfo('FAQPage', frameItem)
		} else {
			textData += viewSchemaInfo('FAQPage', frameItem);
		}	
	}	
	
	return textData;
}


// Получает все страницы выбранной группы
groupElem.forEach((elem)=>{
	elem.addEventListener('click', function(e){
		
		const groupID = e.target.parentElement.dataset.groupId;
		const groupName = e.target.innerText;

		fetch('/differs/controller.php', {
			method: 'POST',
			body: JSON.stringify({
				getAllPages: 1,
				groupID
			}),
		}).then(async (response) => {
			try {
				let responseResult = await response.json();
				groupPagesWrap.innerHTML = responseResult.response;
				const pageItem = document.querySelectorAll('.page-item'); 
				addPageForm.classList.add('active');
				groupIdInput.value = groupID;
				pageHeading.innerText = groupName;
				
				ResetCompareBlock();
				
				//выводит версии страниц
				pageItem.forEach((elem)=>{
					elem.addEventListener('click', function(e){
						const pageID = e.target.parentElement.dataset.pageId;
						const pageName = e.target.parentElement.querySelector('.page-item__name');
						fetch('/differs/controller.php', {
							method: 'POST',
							body: JSON.stringify({
								getVersions: 1,
								pageID
							}),
						}).then(async (response) => {
							try {
								const versionsWrappers = document.querySelectorAll('.page-item__versions');
								const dateChangeInputs = document.querySelectorAll('.date-change');
								
								dateChangeInputs.forEach((elem)=>{
									elem.classList.add('active');
								})
								comparePageID.value = pageID;
								
								if(ver1Date.value){
									getVersionsByDate('left', ver1Date);
								}
								if(ver2Date.value){
									getVersionsByDate('left', ver2Date);
								}
								
								
								versionsWrappers.forEach((elem)=>{
									elem.classList.remove('active');
								});
								
								document.querySelectorAll('.selected-one').forEach((elem) => {
									elem.classList.remove('selected-one');
								})
								
								leftFrameWrap.innerHTML = '';
								rightFrameWrap.innerHTML = '';
								
								let responseResult = await response.json();
							
								
								const versionsWrap = e.target.parentElement.parentElement.querySelector('.page-item__versions');
								versionsWrap.innerHTML = responseResult.response;
								versionsWrap.classList.add('active');
								
								versionItems = document.querySelectorAll('.page-version');

								document.querySelector(".content__right h2").innerText = pageName.innerText;
								
								versionItems.forEach((elem)=>{
									elem.addEventListener('click', function(e){
										getVersionContent(e.target);
									})
								})
								
								
							} catch (e) {
								console.log(e);
							}
						});
					});
				});
				
			} catch (e) {
				console.log(e);
			}
		});
	});
})

var forms = document.querySelectorAll('.form');

// Отправляет формы
forms.forEach((elem)=>{
	elem.addEventListener('submit', function(e){
		e.preventDefault();
		
		let data = {};
		
		Object.keys(e.target).forEach((key) => {
			data[e.target[key].name] = e.target[key].value;
		})	
		console.log(data);
		fetch('/differs/controller.php', {
			method: 'POST',
			body: JSON.stringify(
				data
			),
		}).then(async (response) => {
			try {
				//location. reload()
				let responseResult = await response.json();
				console.log(responseResult.response);
			} catch (e) {
				console.log(e);
			}
		});
	});
});



// Удаляет группу
deleteGroupBtn.forEach((elem)=>{
	elem.addEventListener('click', function(e){
		
		var groupID = this.parentElement.dataset.groupId;
		console.log(this);
		fetch('/differs/controller.php', {
			method: 'POST',
			body: JSON.stringify({
				deleteGroup: 1,
				groupID
			}),
		}).then(async (response) => {
			try {

			} catch (e) {
				console.log(e);
			}
		});
	});
});

//выводит код версии в поле для сравнения
function getVersionContent (item){
	
	const versionID = item.dataset.versionId;
	const versionName = item.innerText;
	const selectedOne = document.querySelector('.page-version.selected-one');
	const selectedTwo = document.querySelector('.page-version.selected-two');
	
	const isThisSelectedOne = item.classList.contains('selected-one');
	const isThisSelectedTwo = item.classList.contains('selected-two');
	const inDateInput = item.classList.contains('in-date-input');
	
	
	if(isThisSelectedOne){
		item.classList.remove('selected-one');
		if(selectedTwo){
			selectedTwo.classList.remove('selected-two');
		}	
		leftCompareTitle.innerText = 'Версия не выбрана';
		rightCompareTitle.innerText = 'Версия не выбрана';
	} else if(isThisSelectedTwo){ 
		item.classList.remove('selected-two');
		rightCompareTitle.innerText = 'Версия не выбрана';
	} else {
		if(selectedOne && !selectedTwo){
			rightCompareLoader.classList.add('loading');
			item.classList.add('selected-two');
			rightCompareTitle.innerText = versionName;
		} else if(selectedOne && selectedTwo){
			rightCompareLoader.classList.add('loading');
			selectedTwo.classList.remove('selected-two');
			item.classList.add('selected-two');
			rightCompareTitle.innerText = versionName;
		} else {
			leftCompareLoader.classList.add('loading');
			item.classList.add('selected-one');
			leftCompareTitle.innerText = versionName;
		}
	}
	fetch('/differs/controller.php', {
		method: 'POST',
		body: JSON.stringify({
			getFileContent: 1,
			versionID
		}),
	}).then(async (response) => {
		try {
			let responseResult = await response.json();
			
			if(isThisSelectedOne){
				leftFrameWrap.innerHTML = '';
				rightFrameWrap.innerHTML = '';
			} else if(isThisSelectedTwo){ 
				rightFrameWrap.innerHTML = '';
			} else {
				if(selectedOne && !selectedTwo){
					rightFrameWrap.innerHTML = responseResult.response;
				} else if(selectedOne && selectedTwo){
					rightFrameWrap.innerHTML = responseResult.response;
				} else {
					leftFrameWrap.innerHTML = responseResult.response;
				}
			}
			const frame = window.frames[0];
			const frame2 = window.frames[1];
			if(frame){
				frame.onload = function (){
					console.log('первый фрейм загружен');
					
					leftCompare.innerHTML = getFormattedVersionContent(frame);
					leftCompareLoader.classList.remove('loading');
				}
			}	
			if(frame2){
				frame2.onload = function (){
					console.log('второй фрейм загружен');
									
					rightCompare.innerHTML = htmldiff(leftCompare.innerHTML, getFormattedVersionContent(frame2));
					rightCompareLoader.classList.remove('loading');
				}
			}	
			
		} catch (e) {
			console.log(e);
		}
	});
}

//проверяет версии из уведомления
function checkVersionsFromNotify (item){
	ResetCompareBlock();
	
	
	siteMask.classList.remove('active');
	leftSidebar.classList.remove('active');
	
	leftCompareLoader.classList.add('loading');
	rightCompareLoader.classList.add('loading');
	
	notifyPageName = item.querySelector('.notify-item__title').innerText;
	compareHeading.innerText = notifyPageName;
	const notifyID = item.dataset.notifyId;
	
	console.log(notifyID);
	const ver1Src = item.dataset.ver1;
	const ver1DateText = item.querySelector('.notify-item__ver1').innerText;
	
	const ver2Src = item.dataset.ver2;
	const ver2DateText = item.querySelector('.notify-item__ver2').innerText;
	
	leftFrameWrap.innerHTML = '<iframe class="page-content-frame ver-1" src="'+ ver1Src +'"></iframe>';
	rightFrameWrap.innerHTML = '<iframe class="page-content-frame ver-2" src="'+ ver2Src +'"></iframe>';
	
	const frameFirst= document.querySelector('iframe.ver-1').contentWindow;
	const frameSecond = document.querySelector('iframe.ver-2').contentWindow;
	
	if(frameFirst){
		frameFirst.onload = function (){
			console.log('первый фрейм загружен');
			
			leftCompareTitle.innerText = 'Версия от ' + ver1DateText;
			rightCompareTitle.innerText = 'Версия от ' + ver2DateText;
			
			leftCompare.innerHTML = getFormattedVersionContent(frameFirst);
			leftCompareLoader.classList.remove('loading');
		}
	}	
	if(frameSecond){
		frameSecond.onload = function (){
			console.log('второй фрейм загружен');
							
			rightCompare.innerHTML = htmldiff(leftCompare.innerHTML, getFormattedVersionContent(frameSecond));
			rightCompareLoader.classList.remove('loading');
		}
	}		
	item.remove();
	notifyCount--;
	document.querySelector('.btn-notify span').innerText = notifyCount;
	if(notifyCount == 0){
		notifyBtn.remove();
	}
	fetch('/differs/controller.php', {
		method: 'POST',
		body: JSON.stringify({
			deleteNotify: 1,
			notifyID
		}),
	}).then(async (response) => {
		try {
			let responseResult = await response.json();
			console.log(responseResult.response);
		} catch (e) {
			console.log(e);
		}
	});
}




function checkAllPages (){
	let checkedCount = 0; // количество проверенных страниц
	notifyList = []; // массив для уведомлений
	const pagesFrames = document.querySelectorAll('.frame-for-check'); // фреймы
	serviceLoader.classList.add('loading'); // запускаем загрузку
	pagesFrames.forEach((item)=>{

		let progressPercent = 0;
		const pageUrl = item.dataset.pageUrl;
		const pageID = item.dataset.pageId;
		const firstVerID = item.dataset.ver1Id;
		const secondVerID = item.dataset.ver2Id;
		const filePath1 = item.dataset.filePath1;
		const filePath2 = item.dataset.filePath2;
		
		let frameFirst;
		let frameSecond;
		
		let textData1 = '';
		let textData2 = '';
		
		let report = '';
		let differArray = []; // массив для сравнения
		
		item.innerHTML = '<iframe class="page-content-frame ver-1" src="'+filePath1+'"></iframe>';
		frameFirst= item.querySelector('iframe.ver-1').contentWindow;
		
		let metaTags1;
		let schemaWebSite1;
		let schemaWPHeader1;
		let schemaWPFooter1;
		let schemaMedicalOrganization1;
		let schemaMedicalClinic1;
		let schemaBreadcrumbList1;
		let schemaMedicalScholarlyArticle1;
		let schemaLocalBusiness1;
		let schemaProduct1;
		let schemaPhysician1;
		let schemaFAQPage1;
		let robots1;
		let sitemap1;
		
		let metaTags2;
		let schemaWebSite2;
		let schemaWPHeader2;
		let schemaWPFooter2;
		let schemaMedicalOrganization2;
		let schemaMedicalClinic2;
		let schemaBreadcrumbList2;
		let schemaMedicalScholarlyArticle2;
		let schemaLocalBusiness2;
		let schemaProduct2;
		let schemaPhysician2;
		let schemaFAQPage2;
		let robots2;
		let sitemap2;

		if(frameFirst){
			frameFirst.onload = function (){
	
				
				//textData1 = getFormattedVersionContent(frameFirst);
				
				let robotsBlock1 = frameFirst.document.querySelector('.robots-block');
				let sitemapBlock1 = frameFirst.document.querySelector('.sitemap-block');
				
				if(robotsBlock1){
					robots1 = '<pre style="word-wrap: break-word; white-space: pre-wrap;">'+ robotsBlock1.innerHTML +'</pre>';
				} else if(sitemapBlock1){
					sitemap1 = sitemapBlock1.innerHTML;
				} else {
					//получение всей нужной информации
					
					metaTags1 = viewMetaPageInfo(frameFirst);
					schemaWebSite1 = viewSchemaInfo('WebSite', frameFirst);
					schemaWPHeader1 = viewSchemaInfo('WPHeader', frameFirst);
					schemaWPFooter1 = viewSchemaInfo('WPFooter', frameFirst);
					schemaMedicalOrganization1 = viewSchemaInfo('MedicalOrganization', frameFirst);
					schemaMedicalClinic1 = viewSchemaInfo('MedicalClinic', frameFirst);
					schemaBreadcrumbList1 = viewSchemaInfo('BreadcrumbList', frameFirst);
					schemaMedicalScholarlyArticle1 = viewSchemaInfo('MedicalScholarlyArticle', frameFirst);
					schemaLocalBusiness1 = viewSchemaInfo('LocalBusiness', frameFirst);
					schemaProduct1 = viewSchemaInfo('Product', frameFirst);
					schemaPhysician1 = viewSchemaInfo('Physician', frameFirst);
					if(viewAttrSchemaInfo('FAQPage', frameFirst)){
						schemaFAQPage1 = viewAttrSchemaInfo('FAQPage', frameFirst)
					} else {
						schemaFAQPage1 = viewSchemaInfo('FAQPage', frameFirst);
					}
				}
				item.innerHTML += '<iframe class="page-content-frame ver-2" src="'+filePath2+'"></iframe>';
				
				frameSecond = item.querySelector('iframe.ver-2').contentWindow;
				
				frameSecond.onload = function (){


					const robotsBlock2 = frameSecond.document.querySelector('.robots-block');
					const sitemapBlock2 = frameSecond.document.querySelector('.sitemap-block');
					
					if(robotsBlock2){
						const robots2 = '<pre style="word-wrap: break-word; white-space: pre-wrap;">'+ robotsBlock2.innerHTML +'</pre>';
						// Robots
						if(robots1 == robots2){
					
						} else {
							report += '<b>Robots:</b> есть изменения';
						}
					} else if(sitemapBlock2){
						const sitemap2 = sitemapBlock2.innerHTML;
						
						// Sitemap
						if(sitemap1 == sitemap2){

						} else {
							report += '<b>Sitemap:</b> есть изменения';
						}
					} else {
					
						//получение всей нужной информации
						const metaTags2 = viewMetaPageInfo(frameSecond);
						const schemaWebSite2 = viewSchemaInfo('WebSite', frameSecond);
						const schemaWPHeader2 = viewSchemaInfo('WPHeader', frameSecond);
						const schemaWPFooter2 = viewSchemaInfo('WPFooter', frameSecond);
						const schemaMedicalOrganization2 = viewSchemaInfo('MedicalOrganization', frameSecond);
						const schemaMedicalClinic2 = viewSchemaInfo('MedicalClinic', frameSecond);
						const schemaBreadcrumbList2 = viewSchemaInfo('BreadcrumbList', frameSecond);
						const schemaMedicalScholarlyArticle2 = viewSchemaInfo('MedicalScholarlyArticle', frameSecond);
						const schemaLocalBusiness2 = viewSchemaInfo('LocalBusiness', frameSecond);
						const schemaProduct2 = viewSchemaInfo('Product', frameSecond);
						const schemaPhysician2 = viewSchemaInfo('Physician', frameSecond);
						if(viewAttrSchemaInfo('FAQPage', frameSecond)){
							schemaFAQPage2 = viewAttrSchemaInfo('FAQPage', frameSecond);
						} else {
							schemaFAQPage2 = viewSchemaInfo('FAQPage', frameSecond);
						}
						
						//сравнение блоков
						
						// метатеги
						if(metaTags1){
							if(metaTags1 == metaTags2){
	
								
							} else if(metaTags1.length - metaTags2.length === 1 || metaTags1.length - metaTags2.length === -1){

								report += 'Различие в метатегах на один символ (скорее всего баг с иконками и дефисами в дескрипшенах)';
							} else {
								report += '<b>Метатеги:</b> есть изменения';
							}
						}	
						
						// Website
						if(schemaWebSite1){
							if(schemaWebSite1 == schemaWebSite2){

								
							} else {
								report += '<b>микра WebSite:</b> есть изменения';
							}
						}
						
						// WPHeader
						if(schemaWPHeader1){
							if(schemaWPHeader1 == schemaWPHeader2){
			
							} else {
								report += '<b>микра WPHeader:</b> есть изменения';
							}
						}
						
						// WPFooter
						if(schemaWPFooter1){
							if(schemaWPFooter1 == schemaWPFooter2){
				
								
							} else {
								report += '<b>микра WPFooter:</b> есть изменения';
							}
						}
						
						// MedicalOrganization
						if(schemaMedicalOrganization1){
							if(schemaMedicalOrganization1 == schemaMedicalOrganization2){
	
							} else if(schemaMedicalOrganization1 !== schemaMedicalOrganization2 && schemaMedicalOrganization1.length == schemaMedicalOrganization2.length){

								report += '<b>Изменения в разметке:</b> Скорее всего дата генерируется рандомно';
							} else {
								report += '<b>микра MedicalOrganization:</b> есть изменения';
							}
						}
						
						// MedicalClinic
						if(schemaMedicalClinic1){
							if(schemaMedicalClinic1 == schemaMedicalClinic2){
				
								
							} else {
								report += '<b>микра MedicalClinic:</b> есть изменения';
							}
						}
						
						// BreadcrumbList
						if(schemaBreadcrumbList1){
							if(schemaBreadcrumbList1 == schemaBreadcrumbList2){
					
								
							} else {
								report += '<b>микра BreadcrumbList:</b> есть изменения';
							}
						}
						
						// MedicalScholarlyArticle
						if(schemaMedicalScholarlyArticle1){
							if(schemaMedicalScholarlyArticle1 == schemaMedicalScholarlyArticle2){
					
								
							} else {
								report += '<b>микра MedicalScholarlyArticle:</b> есть изменения';
							}
						}
						
						// LocalBusiness
						if(schemaLocalBusiness1){
							if(schemaLocalBusiness1 == schemaLocalBusiness2){
				
							} else if(schemaLocalBusiness1 !== schemaLocalBusiness2 && schemaLocalBusiness1.length == schemaLocalBusiness2.length){
								report += '<b>Изменения в разметке отзывов:</b> Скорее всего дата генерируется рандомно';
							} else {
								report += '<b>микра LocalBusiness:</b> есть изменения';
							}
						}
						
						// Product
						if(schemaProduct1){
							if(schemaProduct1 == schemaProduct2){
	
							} else {
								report += '<b>микра Product:</b> есть изменения';
							}
						}
						
						// Physician
						if(schemaPhysician1){
							if(schemaPhysician1 == schemaPhysician2){
	
							} else {
								report += '<b>микра Physician:</b> есть изменения';
							}
						}
						
						// FAQPage
						if(schemaFAQPage1 != ''){
							if(schemaFAQPage1 == schemaFAQPage2){
	
							} else {
								report += '<b>микра FAQPage:</b> есть изменения';
							}
						}
					}
					
					if(report !== ''){
						//console.log('Есть изменения в версии', pageUrl);
						checkedCount++;
						progressStage.innerText = checkedCount;
						
						progressPercent = Math.round((checkedCount/pagesFrames.length) * 100);
						progressLine.style.width = progressPercent + '%';
						progressBarPageName.innerText = pageUrl;
						let newNotify = {
							pageID,
							firstVerID,
							secondVerID,
							isModified: true,
							message: report
						}
						notifyList.push(newNotify);
						
					} else {
						//console.log('Версия без изменений', pageUrl);
						//deleteVersionByID(firstVerID);
						checkedCount++;
						progressStage.innerText = checkedCount;
						progressBarPageName.innerText = pageUrl;
						progressPercent = Math.round((checkedCount/pagesFrames.length) * 100);
						progressLine.style.width = progressPercent + '%';
						progressBarPageName.innerText = pageUrl;
					}
					if(checkedCount == pagesFrames.length){
						setCheckedPages();
						if(notifyList.length > 0){
							addNotify(notifyList);
							sendNotifyToTg(notifyList);
						}
					}
				}
			}
		}	

		

	});
}







/*
function checkAllPages (){
	let checkedCount = 0;
	notifyList = [];
	let frameLoaded = 0;
	const pagesFrames = document.querySelectorAll('.frame-for-check');
	serviceLoader.classList.add('loading');
	pagesFrames.forEach((item)=>{

		let progressPercent = 0;
		const pageUrl = item.dataset.pageUrl;
		const pageID = item.dataset.pageId;
		const firstVerID = item.dataset.ver1Id;
		const secondVerID = item.dataset.ver2Id;
		const filePath1 = item.dataset.filePath1;
		const filePath2 = item.dataset.filePath2;
		
		let frameFirst;
		let frameSecond;
		
		let textData1 = '';
		let textData2 = '';
		
		item.innerHTML = '<iframe class="page-content-frame ver-1" src="'+filePath1+'"></iframe>';
		frameFirst= item.querySelector('iframe.ver-1').contentWindow;

		if(frameFirst){
			frameFirst.onload = function (){
				console.log('первый фрейм загружен');
				
				textData1 = getFormattedVersionContent(frameFirst);
				
				//const description1 = frameFirst.document.querySelector('meta[name="description"]').getAttribute('content');
				//console.log(description1);
				
				item.innerHTML += '<iframe class="page-content-frame ver-2" src="'+filePath2+'"></iframe>';
				
				frameSecond = item.querySelector('iframe.ver-2').contentWindow;
				
				frameSecond.onload = function (){
					console.log('второй фрейм загружен');
					
					textData2 = getFormattedVersionContent(frameSecond);
				
					console.log(textData1.length, textData2.length);
					
					
					//const description2 = frameSecond.document.querySelector('meta[name="description"]').getAttribute('content');
					//console.log(description2);
					
					const diffResult = htmldiff(textData1, textData2);
					if(textData1 == textData2){
						console.log('Нет изменений по прямому сравнению');
						
					} else {
						console.log(textData1, textData2);
						console.log('Есть изменения по прямому сравнению');
					}
					
					if(diffResult.includes('<ins>') || diffResult.includes('<del>')){
						console.log('Есть изменения в версии', pageUrl);
						console.log(pagesFrames);
						checkedCount++;
						progressStage.innerText = checkedCount;
						
						progressPercent = Math.round((checkedCount/pagesFrames.length) * 100);
						progressLine.style.width = progressPercent + '%';
						progressBarPageName.innerText = pageUrl;
						let newNotify = {
							pageID,
							firstVerID,
							secondVerID,
							isModified: true
						}
						notifyList.push(newNotify);
						
					} else {
						console.log('Версия без изменений', pageUrl);
						console.log(pagesFrames);
						//deleteVersionByID(firstVerID);
						checkedCount++;
						progressStage.innerText = checkedCount;
						progressBarPageName.innerText = pageUrl;
						progressPercent = Math.round((checkedCount/pagesFrames.length) * 100);
						progressLine.style.width = progressPercent + '%';
						progressBarPageName.innerText = pageUrl;
					}
					if(checkedCount == pagesFrames.length){
						setCheckedPages();
						console.log(notifyList);
						if(notifyList.length > 0){
							addNotify(notifyList);
							sendNotifyToTg(notifyList);
						}
					}
				}
			}
		}	

		

	});
}
*/
function formatDate(date){
	const newDate = date.split('-');
	return `${newDate[2]}.${newDate[1]}.${newDate[0]}`;
}

function deleteVersionByID (id){
	fetch('/differs/controller.php', {
		method: 'POST',
		body: JSON.stringify({
			deleteVersion: 1,
			versionID: id
		}),
	}).then(async (response) => {
		try {
			let responseResult = await response.json();
			console.log(responseResult.response);
		} catch (e) {
			console.log(e);
		}
	});
}

function setCheckedPages(){
	fetch('/differs/controller.php', {
		method: 'POST',
		body: JSON.stringify({
			setPagesChecked: 1
		}),
	}).then(async (response) => {
		try {
			let responseResult = await response.json();
			console.log(responseResult.response);
			serviceLoader.classList.remove('loading');
			//location. reload();
		} catch (e) {
			console.log(e);
		}
	});
}
function addNotify(notifyList){
	
	fetch('/differs/controller.php', {
		method: 'POST',
		body: JSON.stringify({
			addNotify: 1,
			notifies: notifyList
		}),
	}).then(async (response) => {
		try {
			let responseResult = await response.json();
			console.log(responseResult.response);
		} catch (e) {
			console.log(e);
		}
	});
	
}
function sendNotifyToTg(){
	fetch('/differs/controller.php', {
		method: 'POST',
		body: JSON.stringify({
			sendNotify: 1,
			notifies: notifyList
		}),
	}).then(async (response) => {
		try {
			let responseResult = await response.json();
			console.log(responseResult.response);
		} catch (e) {
			console.log(e);
		}
	});
}
if(serviceLoader){
	checkAllPages();
}

ver1Date.addEventListener('change', function(){
	getVersionsByDate('left', this);
});

ver2Date.addEventListener('change', function(){
	getVersionsByDate('right', this);
});

// выводит версии страницы по дате в инпуте
function getVersionsByDate(columnName = 'left', dateElem){

	fetch('/differs/controller.php', {
		method: 'POST',
		body: JSON.stringify({
			getFileContentByDate: 1,
			date: formatDate(dateElem.value),
			pageID: comparePageID.value,
		}),
	}).then(async (response) => {
		try {
			
			let responseResult = await response.json();
			dateElem.nextElementSibling.innerHTML = responseResult.response;
			
			const columnClass = columnName == 'right' ? '.date-change-block__right .page-version' : '.date-change-block__left .page-version';
			
			versionItems = document.querySelectorAll(columnClass);
			
			versionItems.forEach((elem)=>{
				elem.addEventListener('click', function(e){
					getVersionContent(e.target);
				})
			})
			
		} catch (e) {
			console.log(e);
		}
	});
}