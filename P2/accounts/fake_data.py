import random
import accounts.models


from django.conf import settings

settings.DEBUG = True   # Don't do this!


def get_user(usernames, profiles, num=50):
    # return a list of random user
    users = []
    username_list = []
    for i in range(num):
        username = usernames[random.randint(0, len(usernames) - 1)].replace("\n", "")
        if username in username_list:
            continue
        username_list.append(username)
        profile = profiles[random.randint(0, len(profiles) - 1)].replace("\n", "")
        phone_num = "({}){}-{}".format(random.randint(100, 999), random.randint(100, 999), random.randint(1000, 9999))
        password = "12345678"
        user = accounts.models.UserAccount.objects.create_user(username=username,
                                                               password=password,
                                                               phone_num=phone_num,
                                                               avatar=profile)
        users.append(user)
    return users


def get_restaurants(restaurant_names, restaurant_img, owners):
    # return a list of restaurants
    restaurants = []
    restaurant_list = []
    for owner in owners:
        name = restaurant_names[random.randint(0, len(restaurant_names) - 1)].replace("\n", "")
        if name in restaurant_list:
            continue
        restaurant_list.append(name)
        profile = restaurant_img[random.randint(0, len(restaurant_img) - 1)].replace("\n", "")
        phone_num = "({}){}-{}".format(random.randint(100, 999), random.randint(100, 999), random.randint(1000, 9999))
        address = "Somewhere in Canada"
        postal_code = random.randint(100000, 999999).__str__()
        restaurants.append({'restaurant_name': name,
                            'restaurant_logo': profile,
                            'phone_num': phone_num,
                            'postal_code': postal_code,
                            'address': address,
                            'owner': owner})
    return restaurants


def get_restaurants_menu(restaurants, food_name, food_img, num=20):
    # return a list of restaurants menu for all the restaurants

    restaurants_menu = []
    for restaurant in restaurants:
        menu_name_list = []
        for i in range(num):
            name = food_name[random.randint(0, len(food_name) - 1)].replace("\n", "")
            if name in menu_name_list:
                continue
            menu_name_list.append(name)
            profile = food_img[random.randint(0, len(food_img) - 1)].replace("\n", "")
            price = random.randint(0, 100)
            restaurants_menu.append({'menu_name': name,
                                     'image': profile,
                                     'price': price,
                                     'restaurant': restaurant})
    return restaurants_menu


def get_restaurants_blog(restaurants, authors, contents):
    restaurants_blog = []
    blog_num = 3
    feelings = ['awful', 'suck', 'great', 'wonderful', 'excellent']
    for restaurant in restaurants:
        for i in range(blog_num):
            author = authors[random.randint(0, len(authors) - 1)]
            content = contents[random.randint(0, len(contents) - 1)]
            feeling = feelings[random.randint(0, len(feelings) - 1)]
            title = "My {} experience in {}".format(feeling, restaurant['restaurant_name'])
            restaurants_blog.append({
                'restaurant': restaurant,
                'author': author,
                'content': content,
                'title': title
            })
    return restaurants_blog


def get_comments(restaurants, authors, contents):
    restaurant_comments = []
    comments_num = 10
    feelings = ['awful', 'suck', 'great', 'wonderful', 'excellent']
    for restaurant in restaurants:
        for i in range(comments_num):
            author = authors[random.randint(0, len(authors) - 1)]
            content = contents[random.randint(0, len(contents) - 1)]
            score = random.randint(1, 5)
            restaurant_comments.append({
                'restaurant': restaurant,
                'author': author,
                'content': content,
                'score': score
            })
    return restaurant_comments


if __name__ == "__main__":
    foodName = open("src/food_list.txt").readlines()
    foodImg = open("src/food_image_url.txt").readlines()
    restaurantName = open("src/restaurant_name.txt").readlines()
    restaurantImg = open("src/restaurant_img.txt").readlines()
    restaurantCommentsRaw = open("src/restaurant_comment.txt").read().split("---flag---")
    restaurantComments = []
    for each in restaurantCommentsRaw:
        if len(each.strip()) > 10:
            restaurantComments.append(each.strip())
    profileUrl = open("src/profile_url.txt").readlines()
    profileName = open("src/profile_name.txt").readlines()
    users = get_user(profileName, profileUrl)
    print(users)
    # restaurants = get_restaurants(restaurantName, restaurantImg, users)
    # menus = get_restaurants_menu(restaurants, foodName, foodImg)
    # blogs = get_restaurants_blog(restaurants, users, restaurantComments)
    # comments = get_comments(restaurants, users, restaurantComments)
