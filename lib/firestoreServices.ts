import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./firebase";
import { uploadToImgBB } from "./imgbbUpload";
import type {
  Product,
  Category,
  Order,
  Review,
  StoreContent,
  OrderStatus,
  ReviewStatus,
} from "@/types/admin";

// ─────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────
export async function getProducts(): Promise<Product[]> {
  const snap = await getDocs(collection(db, "products"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function getProduct(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, "products", id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Product) : null;
}

export async function createProduct(data: Omit<Product, "id">): Promise<string> {
  const ref2 = await addDoc(collection(db, "products"), {
    ...data,
    updatedAt: serverTimestamp(),
  });
  return ref2.id;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  await updateDoc(doc(db, "products", id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, "products", id));
}

export const INITIAL_PRODUCTS_SEED = [
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

export async function seedDefaultProducts(): Promise<number> {
  const { setDoc } = await import("firebase/firestore");
  let count = 0;
  for (const item of INITIAL_PRODUCTS_SEED) {
    const docRef = doc(db, "products", item.slug);
    const productPayload = {
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
      reviewsCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await setDoc(docRef, productPayload, { merge: true });
    count++;
  }
  return count;
}

// ─────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────
export async function getCategories(): Promise<Category[]> {
  const snap = await getDocs(collection(db, "categories"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Category));
}

export async function createCategory(data: Omit<Category, "id">): Promise<string> {
  const r = await addDoc(collection(db, "categories"), data);
  return r.id;
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<void> {
  await updateDoc(doc(db, "categories", id), data);
}

export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, "categories", id));
}

// ─────────────────────────────────────────────
// ORDERS  (real-time subscribe)
// ─────────────────────────────────────────────
export function subscribeOrders(callback: (orders: Order[]) => void) {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const orders = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
    callback(orders);
  });
}

export async function getOrder(id: string): Promise<Order | null> {
  const snap = await getDoc(doc(db, "orders", id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Order) : null;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  await updateDoc(doc(db, "orders", id), { orderStatus: status });
}

export async function deleteOrder(id: string): Promise<void> {
  await deleteDoc(doc(db, "orders", id));
}

// ─────────────────────────────────────────────
// REVIEWS
// ─────────────────────────────────────────────
export async function getReviews(): Promise<Review[]> {
  const snap = await getDocs(query(collection(db, "reviews"), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Review));
}

export async function updateReviewStatus(id: string, status: ReviewStatus): Promise<void> {
  await updateDoc(doc(db, "reviews", id), { status });
}

export async function deleteReview(id: string): Promise<void> {
  await deleteDoc(doc(db, "reviews", id));
}

// ─────────────────────────────────────────────
// STORE CONTENT
// ─────────────────────────────────────────────
export async function getStoreContent(): Promise<StoreContent | null> {
  const snap = await getDoc(doc(db, "store_content", "homepage"));
  return snap.exists() ? (snap.data() as StoreContent) : null;
}

export async function updateStoreContent(data: Partial<StoreContent>): Promise<void> {
  const ref2 = doc(db, "store_content", "homepage");
  await updateDoc(ref2, data).catch(async () => {
    const { setDoc } = await import("firebase/firestore");
    await setDoc(ref2, data, { merge: true });
  });
}

// ─────────────────────────────────────────────
// STORAGE / IMGBB UPLOAD
// ─────────────────────────────────────────────

export async function uploadImage(
  file: File,
  path: string = "uploads",
  onProgress?: (pct: number) => void
): Promise<string> {
  // If ImgBB API Key is configured, use ImgBB (Free, No Firebase Blaze required)
  if (process.env.NEXT_PUBLIC_IMGBB_API_KEY) {
    return uploadToImgBB(file, onProgress);
  }

  // Fallback to Firebase Storage if key is not configured
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);
    task.on(
      "state_changed",
      (snap) => {
        const pct = (snap.bytesTransferred / snap.totalBytes) * 100;
        onProgress?.(Math.round(pct));
      },
      (error) => {
        console.error("Firebase Storage task error:", error);
        reject(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve(url);
        } catch (err) {
          console.error("Failed to get download URL:", err);
          reject(err);
        }
      }
    );
  });
}

// ─────────────────────────────────────────────
// DASHBOARD STATS
// ─────────────────────────────────────────────
export async function getDashboardStats() {
  const [ordersSnap, productsSnap, reviewsSnap] = await Promise.all([
    getDocs(collection(db, "orders")),
    getDocs(collection(db, "products")),
    getDocs(query(collection(db, "reviews"), where("status", "==", "pending"))),
  ]);
  const orders = ordersSnap.docs.map((d) => d.data() as Order);
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === "Pending").length;
  return {
    totalOrders: ordersSnap.size,
    totalRevenue,
    totalProducts: productsSnap.size,
    pendingReviews: reviewsSnap.size,
    pendingOrders,
  };
}
