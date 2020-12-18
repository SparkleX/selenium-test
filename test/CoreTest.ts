import * as webdriver from "selenium-webdriver";
import { WebDriver, Builder, By, Key, until } from "selenium-webdriver";
import { textChangeRangeIsUnchanged } from "typescript";

type Callback = (action: CoreTest) => Promise<void>;

export class CoreTest {
	public driver: WebDriver;
	private timeout = 100000;

	async open(): Promise<void> {
		this.driver = await new Builder().forBrowser("chrome").withCapabilities(webdriver.Capabilities.chrome()).build();
	}
	async close(): Promise<void> {
		await this.driver.quit();
	}

	async sendKeys(id: string, ...input: any): Promise<void> {
		const oItem = By.id(id);
		await this.driver.wait(until.elementLocated(oItem), this.timeout);
		await this.driver.findElement(oItem).sendKeys(...input);
	}

	async click(id: string): Promise<void> {
		const oItem = By.id(id);
		await this.driver.wait(until.elementLocated(oItem), this.timeout);
		await this.driver.findElement(oItem).click();
	}

	async getAttributeValue(id: string): Promise<string> {
		const oItem = By.id(id);
		const text = await this.driver.findElement(oItem).getAttribute("value");
		return text;
	}

	/*public static async run(testCallback: Callback): Promise<void> {
		const oCoreTest = new CoreTest();
		await oCoreTest.open();
		try {
			await testCallback(oCoreTest);
		} finally {
			await oCoreTest.close();
		}
	}*/
}
