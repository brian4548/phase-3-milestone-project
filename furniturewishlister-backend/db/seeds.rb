# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Furniture.destroy_all
Wishlist.destroy_all
Furniturewishlist.destroy_all

brian = User.create(username: "Brian")
ebyan = User.create(username: "Ebyan")
bob = User.create(username: "Bob")

black_jeans = Furniture.create(name: "High Waisted Skinny Jeans", brand: "Levi's", category: "pants", color: "Black", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlHxDApGI8Lwu6WV0MwBEX3A7Mbybevgi5sg&usqp=CAU", user_id: brian.id)
blue_jeans = Furniture.create(name: "Boyfriend Jeans", brand: "Madewell", category: "pants", color: "Blue", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2e18DX9p9KXpRo8umRDPjmeI85-HJAH9zCA&usqp=CAU", user_id: brian.id)
striped_top = Furniture.create(name: "Striped Tee", brand: "Madewell", category: "tops", color: "Multi", image: "https://i.s-madewell.com/is/image/madewell/H2671_KA4133_ld?wid=500&hei=635&fmt=jpeg&fit=crop&qlt=75,1&resMode=bisharp&op_usm=0.5,1,5,0", user_id: brian.id)
white_tee = Furniture.create(name: "White Tee", brand: "Uniqlo", category: "tops", color: "White", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ18omBFWcI9FkMbUSJgWVcKNJYLQTZ_EdTv83i9Gi1DmJ2pG-Aex84zznAlmQVvO-DaD_T58T3A&usqp=CAc", user_id: brian.id)
dress = Furniture.create(name: "Emerald Midi Dress", brand: "Calvin Klein", category: "dresses", color: "Green", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuDkbcT3IejRpXZuMbD2CPidgdRhCve6zo3Q&usqp=CAU", user_id: brian.id)
sneakers = Furniture.create(name: "Stan Smith Sneakers", brand: "Adidas", category: "shoes", color: "White/Green", image: "https://n.nordstrommedia.com/id/sr3/3d4dc2f8-2650-4811-b430-378e50e2a19f.jpeg?height=650&width=434", user_id: brian.id)
heels = Furniture.create(name: "Black Suede Pumps", brand: "J. Crew", category: "shoes", color: "Black", image: "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/28/5b5ce7e34f50d0d06b922cc5/m_5b5ce7e7baebf6ea69355250.jpeg", user_id: brian.id)

fancy_night = Wishlist.create(name: "Company Christmas Party", setting: "Winter", user_id: brian.id)
    Furniturewishlist.create(furniture_id: dress.id, wishlist_id: fancy_night.id)
    Furniturewishlist.create(furniture_id: heels.id, wishlist_id: fancy_night.id)

basics = Wishlist.create(name: "Back to Basics", setting: "Any", user_id: brian.id)
    Furniturewishlist.create(furniture_id: white_tee.id, wishlist_id: basics.id)
    Furniturewishlist.create(furniture_id: blue_jeans.id, wishlist_id: basics.id)
    Furniturewishlist.create(furniture_id: sneakers.id, wishlist_id: basics.id)

casual = Wishlist.create(name: "Brunch Date", setting: "Spring", user_id: brian.id)
    Furniturewishlist.create(furniture_id: striped_top.id, wishlist_id: casual.id)
    Furniturewishlist.create(furniture_id: black_jeans.id, wishlist_id: casual.id)
    Furniturewishlist.create(furniture_id: sneakers.id, wishlist_id: casual.id)

date_night = Wishlist.create(name: "Date Night", setting: "Any", user_id: brian.id)
    Furniturewishlist.create(furniture_id: black_jeans.id, wishlist_id: date_night.id)
    Furniturewishlist.create(furniture_id: heels.id, wishlist_id: date_night.id)
    Furniturewishlist.create(furniture_id: white_tee.id, wishlist_id: date_night.id)

# ebyan's clothes
black_dress = Furniture.create(name: "Skater Dress", brand: "Forever 21", category: "dresses", color: "Black", image: "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw6cf27273/4_full_750/00402624-03.jpg?sw=500&sh=750", user_id: ebyan.id)
plaid_coat = Furniture.create(name: "Plaid Coat", brand: "Bagatelle", category: "jackets", color: "Plaid", image: "https://n.nordstrommedia.com/id/sr3/42de9f1d-3bd5-4bc3-a5a4-5010e1ce65ca.jpeg?height=650&width=434", user_id: ebyan.id)
button_up = Furniture.create(name: "Striped Button Down", brand: "Ann Taylor", category: "tops", color: "White", image: "https://anninc.scene7.com/is/image/ATF/505715_9000?$488x601$", user_id: ebyan.id)
bike_shorts = Furniture.create(name: "Bike Shorts", brand: "Alo", category: "shorts", color: "Black", image: "https://cdn.shopify.com/s/files/1/2185/2813/products/W6218R_01_1_750x.jpg?v=1605323974", user_id: ebyan.id)
cami = Furniture.create(name: "Silk Cami", brand: "Lulu's", category: "tops", color: "Chartreuse", image: "https://www.lulus.com/images/product/xlarge/5422590_1022762.jpg?w=560", user_id: ebyan.id)
red_dress = Furniture.create(name: "Cowl Neck Slip Dress", brand: "UO", category: "dresses", color: "Red", image: "https://s7d5.scene7.com/is/image/UrbanWishlistters/49120231_063_f?$xlarge$=&fit=constrain&fmt=webp&qlt=80&wid=683", user_id: ebyan.id)
skirt = Furniture.create(name: "Pleated Mini Skirt", brand: "Romwe", category: "skirts", color: "Purple", image: "https://img.ltwebstatic.com/images3_pi/2019/11/27/15748376930dc40aa88a9597d05ad3502766664173_thumbnail_600x.jpg", user_id: ebyan.id)