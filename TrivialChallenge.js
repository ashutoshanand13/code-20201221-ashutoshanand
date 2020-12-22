const puppeteer = require( 'puppeteer' );

( async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
	await page.goto( 'https://prefeitura.pbh.gov.br/saude/licitacao/pregao-eletronico-151-2020' );
    
	var RequiredDetails = await page.$$( 'span.lbl-licitacao' );
	//Print The Data for Publication Data and Bidding Date
    for( let detail of RequiredDetails ) {
        try {
			var data = await ( await detail.getProperty( 'innerText' ) ).jsonValue();
			if(data.includes('DATA DA')){
			console.log(data);
			}
        }
        catch( e ) {
            console.log( `Could not get the needed data:`, e.message );
        }
    }

	//Print The Object Details
	const pTags = await page.$$("p");
	var data = await (await pTags[0].getProperty('innerText')).jsonValue();
	console.log('OBJETO : ' + data);
	
	//Print the links
	 let urls = await page.$$eval('div.field--name-field-icone-link', links =>{
		 links = links.map(el => el.querySelector('div.field--type-image > a').href)
         return links;
	 });
	console.log('Links : '+urls);

    await browser.close();
} )();
