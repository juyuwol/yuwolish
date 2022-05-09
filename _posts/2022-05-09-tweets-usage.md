---
title: "트윗 스크래핑 기능 사용법"
description: "include 태그를 이용한 jekyll-twitter-plugin 래퍼 설명서"
category: "usage"
tweets:
  - https://twitter.com/JuYuwol/status/1523293244955586562
  - https://twitter.com/JuYuwol/status/1523293726692429824
---
유월리시는 [jekyll-twitter-plugin](https://github.com/rob-murray/jekyll-twitter-plugin)과 연동해 트윗을 간단하게 스크랩할 수 있는 래퍼를 제공합니다.

저장소의 [마크다운 코드](https://raw.githubusercontent.com/juyuwol/yuwolish/master/_posts/2022-05-09-tweets-usage.md)와 출력을 비교해 보세요.

## 단일 트윗 아카이빙

코드:  
{% raw %}`{% include tweet.liquid url="https://twitter.com/JuYuwol/status/1523293244955586562" %}`{% endraw %}

출력:

{% include tweet.liquid url="https://twitter.com/JuYuwol/status/1523293244955586562" %}

## 트윗 스레드 아카이빙

트윗 스레드(tweets.liquid)의 경우, URL 인수를 입력받지 않고 페이지 front matter의 tweets 요소의 배열을 참조합니다.

코드:  
{% raw %}`{% include tweets.liquid %}`{% endraw %}

출력:

{% include tweets.liquid %}

## 주의사항

상단 코드를 이용해 일차적으로 빌드한 뒤, **반드시** 출력 결과의 스크랩된 스니펫을 스크랩 코드 자리에 복사/붙여넣기해주세요.

그러지 않으면 매번 빌드할 때마다 트위터로부터 새로 트윗을 긁어오기 때문에 성능 문제가 발생할 수 있고 최악의 경우(트윗이 많은 경우) 빌드가 실패할 수 있습니다.

(정확히는, Vercel이나 Netlify 같은 플랫폼에서 배포를 할 경우에 해당됩니다. 로컬에서는 캐시가 가능하기 때문에 크게 문제는 없습니다.)

이에 대한 설명은 유월리시의 원본인 [유월당 템플릿에서의 스크랩 과정을 다룬 글](https://yuwol.pe.kr/making-my-homepage-1.html#content-scrapper)을 참조해 주세요.
