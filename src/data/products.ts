export interface Product {
  id: string;
  name: string;
  hindiName: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  images?: string[];
  description: string;
  unit: string;
}

export const CATEGORIES = [
  'Vegetables & Fruits',
  'Dairy & Breakfast',
  'Munchies',
  'Personal Care',
  'Staples',
  'Beverages',
  'Meat & Seafood',
  'Home Care'
];

const RAW_PRODUCTS: Product[] = [
  // Vegetables & Fruits (20)
  { id: '1', name: 'Potato', hindiName: 'Aloo', category: 'Vegetables & Fruits', price: 30, originalPrice: 40, image: 'https://picsum.photos/seed/potato/200', description: 'Fresh potatoes', unit: '1 kg' },
  { id: '2', name: 'Onion', hindiName: 'Pyaz', category: 'Vegetables & Fruits', price: 40, originalPrice: 50, image: 'https://picsum.photos/seed/onion/200', description: 'Fresh red onions', unit: '1 kg' },
  { id: '3', name: 'Tomato', hindiName: 'Tamatar', category: 'Vegetables & Fruits', price: 25, originalPrice: 35, image: 'https://picsum.photos/seed/tomato/200', description: 'Fresh red tomatoes', unit: '1 kg' },
  { id: '4', name: 'Cauliflower', hindiName: 'Phool Gobi', category: 'Vegetables & Fruits', price: 45, originalPrice: 60, image: 'https://picsum.photos/seed/cauliflower/200', description: 'Fresh cauliflower', unit: '1 pc' },
  { id: '5', name: 'Green Chili', hindiName: 'Hari Mirch', category: 'Vegetables & Fruits', price: 15, originalPrice: 20, image: 'https://picsum.photos/seed/chili/200', description: 'Spicy green chilies', unit: '100 g' },
  { id: '6', name: 'Ginger', hindiName: 'Adrak', category: 'Vegetables & Fruits', price: 20, originalPrice: 30, image: 'https://picsum.photos/seed/ginger/200', description: 'Fresh ginger root', unit: '100 g' },
  { id: '7', name: 'Apple', hindiName: 'Seb', category: 'Vegetables & Fruits', price: 120, originalPrice: 150, image: 'https://picsum.photos/seed/apple/200', description: 'Fresh red apples', unit: '1 kg' },
  { id: '8', name: 'Pomegranate', hindiName: 'Anaar', category: 'Vegetables & Fruits', price: 150, originalPrice: 180, image: 'https://picsum.photos/seed/pomegranate/200', description: 'Fresh pomegranates', unit: '1 kg' },
  { id: '9', name: 'Mango', hindiName: 'Aam', category: 'Vegetables & Fruits', price: 100, originalPrice: 120, image: 'https://picsum.photos/seed/mango/200', description: 'Sweet Alphonso mangoes', unit: '1 kg' },
  { id: '10', name: 'Banana', hindiName: 'Kela', category: 'Vegetables & Fruits', price: 50, originalPrice: 60, image: 'https://picsum.photos/seed/banana/200', description: 'Fresh robusta bananas', unit: '1 Dozen' },
  { id: '11', name: 'Carrot', hindiName: 'Gajar', category: 'Vegetables & Fruits', price: 40, originalPrice: 50, image: 'https://picsum.photos/seed/carrot/200', description: 'Fresh orange carrots', unit: '500 g' },
  { id: '12', name: 'Cabbage', hindiName: 'Patta Gobi', category: 'Vegetables & Fruits', price: 30, originalPrice: 40, image: 'https://picsum.photos/seed/cabbage/200', description: 'Fresh green cabbage', unit: '1 pc' },
  { id: '13', name: 'Capsicum', hindiName: 'Shimla Mirch', category: 'Vegetables & Fruits', price: 60, originalPrice: 80, image: 'https://picsum.photos/seed/capsicum/200', description: 'Fresh green capsicum', unit: '500 g' },
  { id: '14', name: 'Garlic', hindiName: 'Lehsun', category: 'Vegetables & Fruits', price: 150, originalPrice: 200, image: 'https://picsum.photos/seed/garlic/200', description: 'Fresh garlic bulbs', unit: '200 g' },
  { id: '15', name: 'Lemon', hindiName: 'Nimbu', category: 'Vegetables & Fruits', price: 80, originalPrice: 100, image: 'https://picsum.photos/seed/lemon/200', description: 'Fresh yellow lemons', unit: '250 g' },
  { id: '16', name: 'Watermelon', hindiName: 'Tarbooz', category: 'Vegetables & Fruits', price: 60, originalPrice: 80, image: 'https://picsum.photos/seed/watermelon/200', description: 'Sweet watermelon', unit: '1 pc' },
  { id: '17', name: 'Papaya', hindiName: 'Papeeta', category: 'Vegetables & Fruits', price: 50, originalPrice: 70, image: 'https://picsum.photos/seed/papaya/200', description: 'Ripe papaya', unit: '1 pc' },
  { id: '18', name: 'Grapes', hindiName: 'Angoor', category: 'Vegetables & Fruits', price: 90, originalPrice: 120, image: 'https://picsum.photos/seed/grapes/200', description: 'Fresh green grapes', unit: '500 g' },
  { id: '19', name: 'Orange', hindiName: 'Santra', category: 'Vegetables & Fruits', price: 70, originalPrice: 90, image: 'https://picsum.photos/seed/orange/200', description: 'Fresh Nagpur oranges', unit: '1 kg' },
  { id: '20', name: 'Pineapple', hindiName: 'Ananas', category: 'Vegetables & Fruits', price: 80, originalPrice: 100, image: 'https://picsum.photos/seed/pineapple/200', description: 'Fresh pineapple', unit: '1 pc' },

  // Dairy & Breakfast (15)
  { id: '21', name: 'Milk', hindiName: 'Doodh', category: 'Dairy & Breakfast', price: 33, originalPrice: 35, image: 'https://picsum.photos/seed/milk/200', description: 'Full cream milk', unit: '500 ml' },
  { id: '22', name: 'Paneer', hindiName: 'Paneer', category: 'Dairy & Breakfast', price: 85, originalPrice: 95, image: 'https://picsum.photos/seed/paneer/200', description: 'Fresh malai paneer', unit: '200 g' },
  { id: '23', name: 'Curd', hindiName: 'Dahi', category: 'Dairy & Breakfast', price: 30, originalPrice: 35, image: 'https://picsum.photos/seed/curd/200', description: 'Thick and tasty curd', unit: '400 g' },
  { id: '24', name: 'Bread', hindiName: 'Bread', category: 'Dairy & Breakfast', price: 40, originalPrice: 45, image: 'https://picsum.photos/seed/bread/200', description: 'White sandwich bread', unit: '1 pack' },
  { id: '25', name: 'Eggs', hindiName: 'Ande', category: 'Dairy & Breakfast', price: 45, originalPrice: 50, image: 'https://picsum.photos/seed/eggs/200', description: 'Farm fresh eggs', unit: '6 pcs' },
  { id: '26', name: 'Butter', hindiName: 'Makhan', category: 'Dairy & Breakfast', price: 55, originalPrice: 60, image: 'https://picsum.photos/seed/butter/200', description: 'Salted butter', unit: '100 g' },
  { id: '27', name: 'Cheese Slices', hindiName: 'Cheese', category: 'Dairy & Breakfast', price: 120, originalPrice: 140, image: 'https://picsum.photos/seed/cheese/200', description: 'Processed cheese slices', unit: '200 g' },
  { id: '28', name: 'Oats', hindiName: 'Oats', category: 'Dairy & Breakfast', price: 150, originalPrice: 180, image: 'https://picsum.photos/seed/oats/200', description: 'Rolled oats', unit: '1 kg' },
  { id: '29', name: 'Corn Flakes', hindiName: 'Corn Flakes', category: 'Dairy & Breakfast', price: 290, originalPrice: 320, image: 'https://picsum.photos/seed/cornflakes/200', description: 'Original corn flakes', unit: '875 g' },
  { id: '30', name: 'Peanut Butter', hindiName: 'Peanut Butter', category: 'Dairy & Breakfast', price: 180, originalPrice: 200, image: 'https://picsum.photos/seed/peanutbutter/200', description: 'Creamy peanut butter', unit: '340 g' },
  { id: '31', name: 'Honey', hindiName: 'Shahad', category: 'Dairy & Breakfast', price: 199, originalPrice: 250, image: 'https://picsum.photos/seed/honey/200', description: 'Pure natural honey', unit: '500 g' },
  { id: '32', name: 'Mixed Fruit Jam', hindiName: 'Jam', category: 'Dairy & Breakfast', price: 140, originalPrice: 160, image: 'https://picsum.photos/seed/jam/200', description: 'Mixed fruit jam', unit: '500 g' },
  { id: '33', name: 'Muesli', hindiName: 'Muesli', category: 'Dairy & Breakfast', price: 250, originalPrice: 300, image: 'https://picsum.photos/seed/muesli/200', description: 'Fruit and nut muesli', unit: '400 g' },
  { id: '34', name: 'Yogurt', hindiName: 'Yogurt', category: 'Dairy & Breakfast', price: 40, originalPrice: 50, image: 'https://picsum.photos/seed/yogurt/200', description: 'Flavored yogurt', unit: '100 g' },
  { id: '35', name: 'Lassi', hindiName: 'Lassi', category: 'Dairy & Breakfast', price: 25, originalPrice: 30, image: 'https://picsum.photos/seed/lassi/200', description: 'Sweet lassi', unit: '200 ml' },

  // Munchies (15)
  { id: '36', name: 'Potato Chips', hindiName: 'Chips', category: 'Munchies', price: 20, originalPrice: 20, image: 'https://picsum.photos/seed/chips/200', description: 'Classic salted potato chips', unit: '1 pack' },
  { id: '37', name: 'Nachos', hindiName: 'Nachos', category: 'Munchies', price: 40, originalPrice: 45, image: 'https://picsum.photos/seed/nachos/200', description: 'Cheese flavored nachos', unit: '1 pack' },
  { id: '38', name: 'Biscuits', hindiName: 'Biskut', category: 'Munchies', price: 30, originalPrice: 35, image: 'https://picsum.photos/seed/biscuits/200', description: 'Chocolate chip cookies', unit: '1 pack' },
  { id: '39', name: 'Namkeen', hindiName: 'Namkeen', category: 'Munchies', price: 50, originalPrice: 55, image: 'https://picsum.photos/seed/namkeen/200', description: 'Spicy mixture namkeen', unit: '200 g' },
  { id: '40', name: 'Popcorn', hindiName: 'Popcorn', category: 'Munchies', price: 30, originalPrice: 40, image: 'https://picsum.photos/seed/popcorn/200', description: 'Butter popcorn', unit: '1 pack' },
  { id: '41', name: 'Chocolate Bar', hindiName: 'Chocolate', category: 'Munchies', price: 40, originalPrice: 50, image: 'https://picsum.photos/seed/chocolate/200', description: 'Milk chocolate bar', unit: '1 pc' },
  { id: '42', name: 'Bhujia', hindiName: 'Bhujia', category: 'Munchies', price: 90, originalPrice: 100, image: 'https://picsum.photos/seed/bhujia/200', description: 'Aloo bhujia', unit: '400 g' },
  { id: '43', name: 'Roasted Peanuts', hindiName: 'Mungfali', category: 'Munchies', price: 45, originalPrice: 50, image: 'https://picsum.photos/seed/peanuts/200', description: 'Salted roasted peanuts', unit: '200 g' },
  { id: '44', name: 'Cookies', hindiName: 'Cookies', category: 'Munchies', price: 60, originalPrice: 75, image: 'https://picsum.photos/seed/cookies/200', description: 'Butter cookies', unit: '1 pack' },
  { id: '45', name: 'Wafers', hindiName: 'Wafers', category: 'Munchies', price: 35, originalPrice: 40, image: 'https://picsum.photos/seed/wafers/200', description: 'Cream wafers', unit: '1 pack' },
  { id: '46', name: 'Instant Noodles', hindiName: 'Maggi', category: 'Munchies', price: 14, originalPrice: 14, image: 'https://picsum.photos/seed/noodles/200', description: 'Masala instant noodles', unit: '1 pack' },
  { id: '47', name: 'Pasta', hindiName: 'Pasta', category: 'Munchies', price: 45, originalPrice: 55, image: 'https://picsum.photos/seed/pasta/200', description: 'Penne pasta', unit: '400 g' },
  { id: '48', name: 'Soup Powder', hindiName: 'Soup', category: 'Munchies', price: 50, originalPrice: 60, image: 'https://picsum.photos/seed/soup/200', description: 'Tomato soup powder', unit: '1 pack' },
  { id: '49', name: 'Khakhra', hindiName: 'Khakhra', category: 'Munchies', price: 65, originalPrice: 80, image: 'https://picsum.photos/seed/khakhra/200', description: 'Plain khakhra', unit: '200 g' },
  { id: '50', name: 'Makhana', hindiName: 'Makhana', category: 'Munchies', price: 120, originalPrice: 150, image: 'https://picsum.photos/seed/makhana/200', description: 'Roasted makhana', unit: '100 g' },

  // Personal Care (15)
  { id: '51', name: 'Soap', hindiName: 'Sabun', category: 'Personal Care', price: 35, originalPrice: 40, image: 'https://picsum.photos/seed/soap/200', description: 'Moisturizing bathing bar', unit: '1 pc' },
  { id: '52', name: 'Shampoo', hindiName: 'Shampoo', category: 'Personal Care', price: 150, originalPrice: 180, image: 'https://picsum.photos/seed/shampoo/200', description: 'Anti-dandruff shampoo', unit: '180 ml' },
  { id: '53', name: 'Toothpaste', hindiName: 'Toothpaste', category: 'Personal Care', price: 60, originalPrice: 70, image: 'https://picsum.photos/seed/toothpaste/200', description: 'Fluoride toothpaste', unit: '100 g' },
  { id: '54', name: 'Deodorant', hindiName: 'Deo', category: 'Personal Care', price: 199, originalPrice: 250, image: 'https://picsum.photos/seed/deo/200', description: 'Long-lasting body spray', unit: '150 ml' },
  { id: '55', name: 'Face Wash', hindiName: 'Face Wash', category: 'Personal Care', price: 120, originalPrice: 150, image: 'https://picsum.photos/seed/facewash/200', description: 'Neem face wash', unit: '100 ml' },
  { id: '56', name: 'Body Lotion', hindiName: 'Lotion', category: 'Personal Care', price: 250, originalPrice: 300, image: 'https://picsum.photos/seed/lotion/200', description: 'Winter body lotion', unit: '200 ml' },
  { id: '57', name: 'Hair Oil', hindiName: 'Tel', category: 'Personal Care', price: 90, originalPrice: 110, image: 'https://picsum.photos/seed/hairoil/200', description: 'Coconut hair oil', unit: '200 ml' },
  { id: '58', name: 'Toothbrush', hindiName: 'Brush', category: 'Personal Care', price: 40, originalPrice: 50, image: 'https://picsum.photos/seed/toothbrush/200', description: 'Soft bristle toothbrush', unit: '1 pc' },
  { id: '59', name: 'Shaving Cream', hindiName: 'Shaving Cream', category: 'Personal Care', price: 70, originalPrice: 85, image: 'https://picsum.photos/seed/shaving/200', description: 'Smooth shaving cream', unit: '100 g' },
  { id: '60', name: 'Razors', hindiName: 'Razor', category: 'Personal Care', price: 150, originalPrice: 180, image: 'https://picsum.photos/seed/razor/200', description: 'Disposable razors', unit: '3 pcs' },
  { id: '61', name: 'Sanitary Pads', hindiName: 'Pads', category: 'Personal Care', price: 80, originalPrice: 95, image: 'https://picsum.photos/seed/pads/200', description: 'Regular sanitary pads', unit: '1 pack' },
  { id: '62', name: 'Hand Wash', hindiName: 'Hand Wash', category: 'Personal Care', price: 99, originalPrice: 120, image: 'https://picsum.photos/seed/handwash/200', description: 'Liquid hand wash', unit: '200 ml' },
  { id: '63', name: 'Tissues', hindiName: 'Tissues', category: 'Personal Care', price: 50, originalPrice: 60, image: 'https://picsum.photos/seed/tissues/200', description: 'Soft facial tissues', unit: '1 box' },
  { id: '64', name: 'Cotton Swabs', hindiName: 'Cotton', category: 'Personal Care', price: 30, originalPrice: 40, image: 'https://picsum.photos/seed/cotton/200', description: 'Cotton ear swabs', unit: '1 pack' },
  { id: '65', name: 'Lip Balm', hindiName: 'Lip Balm', category: 'Personal Care', price: 120, originalPrice: 150, image: 'https://picsum.photos/seed/lipbalm/200', description: 'Moisturizing lip balm', unit: '1 pc' },

  // Staples (15)
  { id: '66', name: 'Atta', hindiName: 'Atta', category: 'Staples', price: 200, originalPrice: 220, image: 'https://picsum.photos/seed/atta/200', description: 'Whole wheat chakki atta', unit: '5 kg' },
  { id: '67', name: 'Rice', hindiName: 'Chawal', category: 'Staples', price: 350, originalPrice: 400, image: 'https://picsum.photos/seed/rice/200', description: 'Basmati rice', unit: '5 kg' },
  { id: '68', name: 'Toor Dal', hindiName: 'Arhar Dal', category: 'Staples', price: 160, originalPrice: 180, image: 'https://picsum.photos/seed/dal/200', description: 'Unpolished toor dal', unit: '1 kg' },
  { id: '69', name: 'Sugar', hindiName: 'Cheeni', category: 'Staples', price: 45, originalPrice: 50, image: 'https://picsum.photos/seed/sugar/200', description: 'Refined white sugar', unit: '1 kg' },
  { id: '70', name: 'Salt', hindiName: 'Namak', category: 'Staples', price: 25, originalPrice: 28, image: 'https://picsum.photos/seed/salt/200', description: 'Iodized salt', unit: '1 kg' },
  { id: '71', name: 'Sunflower Oil', hindiName: 'Tel', category: 'Staples', price: 140, originalPrice: 160, image: 'https://picsum.photos/seed/oil/200', description: 'Refined sunflower oil', unit: '1 L' },
  { id: '72', name: 'Mustard Oil', hindiName: 'Sarson Tel', category: 'Staples', price: 160, originalPrice: 190, image: 'https://picsum.photos/seed/mustardoil/200', description: 'Kachi ghani mustard oil', unit: '1 L' },
  { id: '73', name: 'Chana Dal', hindiName: 'Chana Dal', category: 'Staples', price: 90, originalPrice: 110, image: 'https://picsum.photos/seed/chanadal/200', description: 'Unpolished chana dal', unit: '1 kg' },
  { id: '74', name: 'Moong Dal', hindiName: 'Moong Dal', category: 'Staples', price: 110, originalPrice: 130, image: 'https://picsum.photos/seed/moongdal/200', description: 'Yellow moong dal', unit: '1 kg' },
  { id: '75', name: 'Urad Dal', hindiName: 'Urad Dal', category: 'Staples', price: 130, originalPrice: 150, image: 'https://picsum.photos/seed/uraddal/200', description: 'White urad dal', unit: '1 kg' },
  { id: '76', name: 'Besan', hindiName: 'Besan', category: 'Staples', price: 80, originalPrice: 100, image: 'https://picsum.photos/seed/besan/200', description: 'Gram flour', unit: '500 g' },
  { id: '77', name: 'Maida', hindiName: 'Maida', category: 'Staples', price: 40, originalPrice: 50, image: 'https://picsum.photos/seed/maida/200', description: 'Refined wheat flour', unit: '1 kg' },
  { id: '78', name: 'Suji', hindiName: 'Suji', category: 'Staples', price: 45, originalPrice: 55, image: 'https://picsum.photos/seed/suji/200', description: 'Semolina', unit: '1 kg' },
  { id: '79', name: 'Poha', hindiName: 'Poha', category: 'Staples', price: 50, originalPrice: 65, image: 'https://picsum.photos/seed/poha/200', description: 'Thick poha', unit: '500 g' },
  { id: '80', name: 'Ghee', hindiName: 'Ghee', category: 'Staples', price: 550, originalPrice: 600, image: 'https://picsum.photos/seed/ghee/200', description: 'Pure cow ghee', unit: '1 L' },

  // Beverages (10)
  { id: '81', name: 'Tea', hindiName: 'Chai', category: 'Beverages', price: 120, originalPrice: 140, image: 'https://picsum.photos/seed/tea/200', description: 'Strong black tea', unit: '250 g' },
  { id: '82', name: 'Coffee', hindiName: 'Coffee', category: 'Beverages', price: 150, originalPrice: 180, image: 'https://picsum.photos/seed/coffee/200', description: 'Instant coffee powder', unit: '50 g' },
  { id: '83', name: 'Cold Drink', hindiName: 'Cold Drink', category: 'Beverages', price: 40, originalPrice: 45, image: 'https://picsum.photos/seed/cola/200', description: 'Cola soft drink', unit: '750 ml' },
  { id: '84', name: 'Juice', hindiName: 'Juice', category: 'Beverages', price: 100, originalPrice: 120, image: 'https://picsum.photos/seed/juice/200', description: 'Mixed fruit juice', unit: '1 L' },
  { id: '85', name: 'Energy Drink', hindiName: 'Energy Drink', category: 'Beverages', price: 110, originalPrice: 125, image: 'https://picsum.photos/seed/energydrink/200', description: 'Energy drink can', unit: '250 ml' },
  { id: '86', name: 'Mineral Water', hindiName: 'Pani', category: 'Beverages', price: 20, originalPrice: 20, image: 'https://picsum.photos/seed/water/200', description: 'Packaged drinking water', unit: '1 L' },
  { id: '87', name: 'Soda', hindiName: 'Soda', category: 'Beverages', price: 20, originalPrice: 25, image: 'https://picsum.photos/seed/soda/200', description: 'Club soda', unit: '750 ml' },
  { id: '88', name: 'Green Tea', hindiName: 'Green Tea', category: 'Beverages', price: 180, originalPrice: 220, image: 'https://picsum.photos/seed/greentea/200', description: 'Green tea bags', unit: '25 bags' },
  { id: '89', name: 'Chocolate Drink', hindiName: 'Bournvita', category: 'Beverages', price: 210, originalPrice: 240, image: 'https://picsum.photos/seed/chocolatedrink/200', description: 'Chocolate health drink', unit: '500 g' },
  { id: '90', name: 'Coconut Water', hindiName: 'Nariyal Pani', category: 'Beverages', price: 50, originalPrice: 60, image: 'https://picsum.photos/seed/coconutwater/200', description: 'Tender coconut water', unit: '200 ml' },

  // Meat & Seafood (5)
  { id: '91', name: 'Chicken Breast', hindiName: 'Chicken', category: 'Meat & Seafood', price: 250, originalPrice: 300, image: 'https://picsum.photos/seed/chicken/200', description: 'Boneless chicken breast', unit: '500 g' },
  { id: '92', name: 'Mutton', hindiName: 'Mutton', category: 'Meat & Seafood', price: 700, originalPrice: 800, image: 'https://picsum.photos/seed/mutton/200', description: 'Fresh mutton curry cut', unit: '500 g' },
  { id: '93', name: 'Fish', hindiName: 'Machli', category: 'Meat & Seafood', price: 300, originalPrice: 350, image: 'https://picsum.photos/seed/fish/200', description: 'Fresh rohu fish', unit: '500 g' },
  { id: '94', name: 'Prawns', hindiName: 'Jhinga', category: 'Meat & Seafood', price: 450, originalPrice: 550, image: 'https://picsum.photos/seed/prawns/200', description: 'Medium sized prawns', unit: '250 g' },
  { id: '95', name: 'Chicken Sausages', hindiName: 'Sausage', category: 'Meat & Seafood', price: 180, originalPrice: 220, image: 'https://picsum.photos/seed/sausage/200', description: 'Chicken sausages', unit: '250 g' },

  // Home Care (5)
  { id: '96', name: 'Detergent Powder', hindiName: 'Surf', category: 'Home Care', price: 180, originalPrice: 210, image: 'https://picsum.photos/seed/detergent/200', description: 'Washing machine detergent', unit: '1 kg' },
  { id: '97', name: 'Dishwash Liquid', hindiName: 'Vim', category: 'Home Care', price: 90, originalPrice: 110, image: 'https://picsum.photos/seed/dishwash/200', description: 'Lemon dishwash liquid', unit: '500 ml' },
  { id: '98', name: 'Floor Cleaner', hindiName: 'Phenyl', category: 'Home Care', price: 150, originalPrice: 180, image: 'https://picsum.photos/seed/floorcleaner/200', description: 'Disinfectant floor cleaner', unit: '1 L' },
  { id: '99', name: 'Toilet Cleaner', hindiName: 'Harpic', category: 'Home Care', price: 99, originalPrice: 120, image: 'https://picsum.photos/seed/toiletcleaner/200', description: 'Liquid toilet cleaner', unit: '500 ml' },
  { id: '100', name: 'Garbage Bags', hindiName: 'Bags', category: 'Home Care', price: 60, originalPrice: 80, image: 'https://picsum.photos/seed/garbagebags/200', description: 'Medium garbage bags', unit: '30 pcs' }
];

export const PRODUCTS: Product[] = RAW_PRODUCTS.map(product => {
  const seedMatch = product.image.match(/seed\/([^\/]+)\//);
  const seed = seedMatch ? seedMatch[1] : product.name.toLowerCase().replace(/ /g, '');
  return {
    ...product,
    images: [
      product.image,
      `https://picsum.photos/seed/${seed}1/400`,
      `https://picsum.photos/seed/${seed}2/400`,
      `https://picsum.photos/seed/${seed}3/400`
    ]
  };
});
