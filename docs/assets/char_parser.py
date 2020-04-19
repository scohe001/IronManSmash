# -*- coding: utf-8 -*-

import re
from bs4 import BeautifulSoup

with open("raw_list.html") as fp:
    soup = BeautifulSoup(fp, features="html.parser")

fighters = soup.div.find_all('li', attrs={'class':'fighter-list__item'}) 

for fighter in fighters:
    # print fighter

    name =  fighter.a.find('div', attrs={'class': 'fighter-list__name'}).p.text.replace(u'É', 'E')

    num_all = fighter.a.find('p', attrs={'class': 'fighter-list__num'}).text

    # Gotta be unicode to support that char
    num_finder = re.compile(u'\\b(\d+ᵋ?)\\b', re.UNICODE)
    num = num_finder.search(num_all).group(1).replace(u'ᵋ', "e")

    img_link_style = fighter.a.find('div', attrs={'class': 'fighter-list__img'}).attrs['style']
    img_finder = re.compile('url\\((.*)\\)')
    img_link = img_finder.search(img_link_style).group(1)

    print "{name: '" + name + "', num: '" + num + "', img_link: '" + img_link + "'},"

