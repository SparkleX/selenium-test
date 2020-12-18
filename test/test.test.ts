import * as webdriver from "selenium-webdriver";

import { Builder, By, Key, until } from "selenium-webdriver";
import { CoreTest } from "./CoreTest";

const oCoreTest = new CoreTest();
beforeEach(async () => {
	await oCoreTest.open();
});
afterEach(async () => {
	await oCoreTest.close();
});

test("test", async () => {
	let driver = await new Builder().forBrowser("chrome").withCapabilities(webdriver.Capabilities.chrome()).build();
	try {
		await driver.get("http://localhost:8080");
		//const item = By.id('companyselect');
		await driver.wait(until.elementLocated(By.id("companyselect")), 0);

		const oCompany = await driver.findElement(By.xpath("//select[@id='companyselect']"));
		await oCompany.sendKeys(Key.DOWN, Key.RETURN);

		await driver.findElement(By.id("username")).sendKeys("manager", Key.RETURN);
		const text = await driver.findElement(By.id("username")).getAttribute("value");
		console.debug(text);
		await driver.findElement(By.id("password")).sendKeys("manager", Key.RETURN);
		await driver.wait(until.elementLocated(By.id("__mbox-btn-0")), 100000);

		await driver.findElement(By.id("__mbox-btn-0")).click();

		await driver.wait(until.elementLocated(By.id("__tile2")), 100000);
		await driver.findElement(By.id("__tile2")).click();
	} finally {
		await driver.quit();
	}
});
test("test2", async () => {
	await oCoreTest.driver.get("http://localhost:8080");
	//const item = By.id('companyselect');
	await oCoreTest.driver.wait(until.elementLocated(By.id("companyselect")), 0);

	const oCompany = await oCoreTest.driver.findElement(By.xpath("//select[@id='companyselect']"));

	await oCompany.sendKeys(Key.DOWN, Key.RETURN);
	await oCoreTest.sendKeys("username", "manager", Key.RETURN);
	await oCoreTest.sendKeys("password", "manager", Key.RETURN);
	const value = await oCoreTest.getAttributeValue("password");
	expect(value).toBe("manager");
	await oCoreTest.click("__mbox-btn-0");
	await oCoreTest.click("__tile2");
});

test("test3", async () => {
	await oCoreTest.driver.get("http://localhost:3000/01");
	//const item = By.id('companyselect');

	await oCoreTest.sendKeys("container-walkthrough---app--textInput-inner", "text001", Key.RETURN);
	let value = await oCoreTest.getAttributeValue("container-walkthrough---app--textInput-inner");
	expect(value).toBe("text001");
	//await oCoreTest.sendKeys("password", "manager", Key.RETURN);
	await oCoreTest.click("container-walkthrough---app--idCheck");
	value = await oCoreTest.getAttributeValue("container-walkthrough---app--idCheck-CB");
	expect(value).toBe("on");

	//sap.ui.xmlview("sap.ui.demo.walkthrough.view.App").byId("idSelect").getSelectedKey()

	const a = await oCoreTest.driver.executeScript(
		`return sap.ui.getCore().byId("container-walkthrough---app--idSelect").getSelectedKey()`
	);
	console.debug(a);
	//await oCoreTest.click("container-walkthrough---app--idSelect");
	/*value = await oCoreTest.getAttributeValue("container-walkthrough---app--idSelect-hiddenSelect");
	console.debug(value);
	await oCoreTest.sendKeys("container-walkthrough---app--hiddenSelect", Key.ARROW_DOWN);
	value = await oCoreTest.getAttributeValue("container-walkthrough---app--idSelect-hiddenSelect");
	console.debug(value);
	await oCoreTest.sendKeys("container-walkthrough---app--idSelect-label", Key.DOWN);
	value = await oCoreTest.getAttributeValue("container-walkthrough---app--idSelect-hiddenSelect");
	console.debug(value);*/
	//await oCoreTest.click("container-walkthrough---app--idButton");
	await oCoreTest.driver.wait(until.elementLocated(By.id("notexists")), 1000000);
});
