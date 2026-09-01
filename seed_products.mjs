const API_KEY = "AIzaSyDTrcf3oTKVoP9jl0Zw55H43n7dgsks5r8";
const PROJECT_ID = "nisar-ki-achar";
const EMAIL = "it.department.anziandco@gmail.com";
const PASSWORD = "anziandco";

const productsToSeed = [
  {
    name: "Mix Achar",
    urduName: "مکس اچار",
    slug: "mix-achar",
    category: "achar",
    categoryName: "Achar",
    description: "A flavorful traditional mix pickle made with a delicious combination of vegetables, spices, and authentic desi flavors. A perfect companion for everyday meals.",
    ingredients: "Mixed vegetables, mustard oil, salt, red chili, turmeric, mustard seeds, fennel, nigella seeds, vinegar, and traditional spices.",
    benefits: "Adds a rich, tangy, and spicy flavor to everyday meals and pairs perfectly with rice, roti, and paratha."
  },
  {
    name: "Khalis Aam Achar",
    urduName: "خالص آم کا اچار",
    slug: "khalis-aam-achar",
    category: "achar",
    categoryName: "Achar",
    description: "Authentic mango pickle prepared with carefully selected mangoes and traditional spices for a bold, tangy, and classic desi taste.",
    ingredients: "Raw mangoes, mustard oil, salt, red chili, turmeric, mustard seeds, fennel, nigella seeds, and traditional pickle spices.",
    benefits: "A classic accompaniment that adds a delicious tangy and spicy kick to your favorite meals."
  },
  {
    name: "Khata Meetha",
    urduName: "کھٹا میٹھا",
    slug: "khata-meetha",
    category: "special-items",
    categoryName: "Special Items",
    description: "A delicious balance of sweet and tangy flavors, specially prepared for those who love a unique combination of traditional desi tastes.",
    ingredients: "Selected fruits and vegetables, sugar, salt, spices, vinegar, and traditional seasoning.",
    benefits: "Perfect for adding a sweet, tangy, and flavorful touch to snacks and everyday meals."
  },
  {
    name: "Green Chutney",
    urduName: "ہری چٹنی",
    slug: "green-chutney",
    category: "chutney",
    categoryName: "Chutney",
    description: "Fresh and flavorful green chutney made with aromatic herbs and traditional spices. A refreshing accompaniment for snacks, meals, and savory dishes.",
    ingredients: "Fresh coriander, green chilies, mint, lemon juice, salt, and traditional spices.",
    benefits: "Adds a fresh, zesty, and spicy flavor to your favorite snacks and meals."
  },
  {
    name: "Sabit Green Mirch Achar",
    urduName: "ثابت ہری مرچ کا اچار",
    slug: "sabit-green-mirch-achar",
    category: "achar",
    categoryName: "Achar",
    description: "Whole green chilies preserved with traditional spices and seasoning, delivering a bold, spicy, and authentic pickle experience.",
    ingredients: "Whole green chilies, mustard oil, salt, red chili, turmeric, mustard seeds, fennel, nigella seeds, and traditional spices.",
    benefits: "A perfect choice for spice lovers looking to add an extra kick to their meals."
  },
  {
    name: "Chola Achar",
    urduName: "چولے کا اچار",
    slug: "chola-achar",
    category: "achar",
    categoryName: "Achar",
    description: "Traditional chola pickle prepared with carefully selected ingredients and authentic spices for a rich, savory, and tangy taste.",
    ingredients: "Chola, mustard oil, salt, red chili, turmeric, mustard seeds, fennel, nigella seeds, vinegar, and traditional spices.",
    benefits: "Pairs wonderfully with roti, paratha, rice, and other traditional dishes."
  },
  {
    name: "Alu Bukhara Chutney",
    urduName: "آلو بخارا چٹنی",
    slug: "alu-bukhara-chutney",
    category: "chutney",
    categoryName: "Chutney",
    description: "A rich and delicious plum chutney combining sweet and tangy flavors with traditional spices for an irresistible taste.",
    ingredients: "Dried plums, sugar, salt, red chili, cumin, vinegar, and traditional spices.",
    benefits: "An excellent accompaniment for snacks, fried foods, and savory dishes."
  },
  {
    name: "Imli Chutney",
    urduName: "املی چٹنی",
    slug: "imli-chutney",
    category: "chutney",
    categoryName: "Chutney",
    description: "Classic tamarind chutney with a naturally tangy and sweet flavor, enhanced with traditional spices for the perfect desi taste.",
    ingredients: "Tamarind, sugar, salt, cumin, red chili, and traditional spices.",
    benefits: "Perfect with samosas, pakoras, chaat, and a variety of savory snacks."
  },
  {
    name: "Mix Vegetable Salad Achar",
    urduName: "مکس ویجیٹیبل سلاد اچار",
    slug: "mix-vegetable-salad-achar",
    category: "achar",
    categoryName: "Achar",
    description: "A colorful blend of selected vegetables prepared with traditional pickle spices for a fresh, crunchy, tangy, and flavorful experience.",
    ingredients: "Mixed vegetables, mustard oil, salt, red chili, turmeric, mustard seeds, fennel, nigella seeds, vinegar, and traditional spices.",
    benefits: "Adds a delicious crunchy and tangy element to everyday meals."
  },
  {
    name: "Garlic Achar",
    urduName: "لہسن کا اچار",
    slug: "garlic-achar",
    category: "achar",
    categoryName: "Achar",
    description: "Flavorful garlic pickle prepared with traditional spices and seasoning, offering a rich and distinctive desi taste.",
    ingredients: "Garlic, mustard oil, salt, red chili, turmeric, mustard seeds, fennel, nigella seeds, vinegar, and traditional spices.",
    benefits: "A flavorful accompaniment that pairs beautifully with rice, roti, paratha, and traditional meals."
  },
  {
    name: "Ginger Achar",
    urduName: "ادرک کا اچار",
    slug: "ginger-achar",
    category: "achar",
    categoryName: "Achar",
    description: "Aromatic ginger pickle prepared with traditional spices, delivering a bold, tangy, and distinctive flavor.",
    ingredients: "Fresh ginger, mustard oil, salt, red chili, turmeric, mustard seeds, fennel, nigella seeds, lemon juice, and traditional spices.",
    benefits: "Adds a fresh, spicy, and tangy flavor to everyday meals."
  },
  {
    name: "Lesora Achar",
    urduName: "لیسوڑے کا اچار",
    slug: "lesora-achar",
    category: "achar",
    categoryName: "Achar",
    description: "Traditional Lesora pickle made with carefully selected ingredients and authentic spices, offering a unique and delicious desi taste.",
    ingredients: "Lesora, mustard oil, salt, red chili, turmeric, mustard seeds, fennel, nigella seeds, vinegar, and traditional spices.",
    benefits: "A unique traditional pickle that brings authentic desi flavor to everyday meals."
  },
  {
    name: "Lemon Achar",
    urduName: "لیموں کا اچار",
    slug: "lemon-achar",
    category: "achar",
    categoryName: "Achar",
    description: "Tangy and flavorful lemon pickle prepared with fresh lemons and traditional spices for a refreshing burst of authentic desi flavor.",
    ingredients: "Fresh lemons, mustard oil, salt, red chili, turmeric, mustard seeds, fennel, nigella seeds, and traditional spices.",
    benefits: "A tangy, refreshing pickle that pairs wonderfully with everyday meals."
  }
];

function toFirestoreFields(obj) {
  const fields = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val === null || val === undefined) {
      fields[key] = { nullValue: null };
    } else if (typeof val === "string") {
      fields[key] = { stringValue: val };
    } else if (typeof val === "number") {
      if (Number.isInteger(val)) {
        fields[key] = { integerValue: val.toString() };
      } else {
        fields[key] = { doubleValue: val };
      }
    } else if (typeof val === "boolean") {
      fields[key] = { booleanValue: val };
    } else if (Array.isArray(val)) {
      fields[key] = {
        arrayValue: {
          values: val.map((item) => {
            if (typeof item === "string") return { stringValue: item };
            if (typeof item === "number") return { doubleValue: item };
            return { stringValue: JSON.stringify(item) };
          })
        }
      };
    } else if (typeof val === "object") {
      fields[key] = {
        mapValue: {
          fields: toFirestoreFields(val)
        }
      };
    }
  }
  return fields;
}

async function main() {
  console.log("Authenticating with Firebase Auth REST API...");
  const authRes = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: EMAIL,
        password: PASSWORD,
        returnSecureToken: true
      })
    }
  );

  const authData = await authRes.json();
  if (!authRes.ok) {
    throw new Error(`Auth failed: ${authData.error?.message || JSON.stringify(authData)}`);
  }

  const idToken = authData.idToken;
  console.log(`Authenticated as ${authData.email}! IdToken obtained.`);

  console.log(`Seeding ${productsToSeed.length} products to Firestore via REST API...`);

  for (let i = 0; i < productsToSeed.length; i++) {
    const item = productsToSeed[i];
    const docData = {
      id: item.slug,
      slug: item.slug,
      name: item.name,
      urduName: item.urduName,
      category: item.category,
      categoryName: item.categoryName,
      description: item.description,
      ingredients: item.ingredients,
      benefits: item.benefits,
      price: 0,
      originalPrice: 0,
      discountBadge: "",
      isBestSeller: false,
      isNew: true,
      inStock: true,
      image: "",
      hoverImage: "",
      images: [],
      weights: ["500g", "1kg"],
      weightPrices: {
        "500g": 0,
        "1kg": 0
      },
      rating: 5.0,
      reviewsCount: 0
    };

    const firestoreBody = {
      fields: toFirestoreFields(docData)
    };

    const docUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/products/${item.slug}`;
    const docRes = await fetch(docUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      },
      body: JSON.stringify(firestoreBody)
    });

    if (!docRes.ok) {
      const err = await docRes.json();
      console.error(`Failed to add ${item.name}:`, err);
    } else {
      console.log(`[${i + 1}/${productsToSeed.length}] Successfully added: ${item.name} (${item.slug})`);
    }
  }

  console.log("All 13 products have been successfully written to Firestore 'products' collection!");
}

main().catch((e) => {
  console.error("Seeding error:", e);
  process.exit(1);
});
