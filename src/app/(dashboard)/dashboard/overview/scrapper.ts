import axios from "axios";
import * as cheerio from "cheerio";

export type RecipeCard = {
  title: string;
  image: string;
  link: string;
  category: string;
  features: string[];
};

const BASE_URL = "https://www.tomatoeswithlemon.com";
const RECIPES_URL = `${BASE_URL}/recipe`;

const toAbsoluteUrl = (href?: string | null) => {
  if (!href) {
    return "";
  }

  return new URL(href, BASE_URL).toString();
};

export const scrapeRecipes = async (): Promise<RecipeCard[]> => {
  const response = await axios.get(RECIPES_URL, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  const $ = cheerio.load(response.data);
  const recipes: RecipeCard[] = [];

  $(".recipes_item").each((_, element) => {
    const card = $(element);
    const title = card.find(".recipes_name").text().trim();
    const image =
      card.find("img").attr("src") || card.find("img").attr("data-src") || "";
    const link = toAbsoluteUrl(card.find("a.recipes_link").attr("href"));
    const category = card
      .find('[fs-cmsfilter-field="type"]')
      .first()
      .text()
      .trim();
    const features = card
      .find('[fs-cmsfilter-field="feature"]')
      .map((_, feature) => $(feature).text().trim())
      .get()
      .filter(Boolean);

    if (title && image && link) {
      recipes.push({
        title,
        image,
        link,
        category,
        features,
      });
    }
  });

  return recipes;
};
