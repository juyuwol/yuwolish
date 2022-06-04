# 유월리시 (Yuwolish)

**유월리시**는 텍스트 아카이빙에 최적화된 단순한 [Jekyll](https://jekyllrb.com/)([한국어 번역](https://jekyllrb-ko.github.io/)) 테마입니다.

[개인 홈페이지](https://yuwol.pe.kr)에 사용하기 위해 만든 템플릿 코드를 테마화시켜 배포합니다.

![스크린샷](/screenshot.png)

[데모 사이트](https://yuwolish.yuwol.pe.kr/)

[포스타입 소개글](https://juyuwol.postype.com/post/12353935)

## 특징

- 텍스트 최적화: 텍스트 아카이빙용으로 개발되었습니다. 이미지를 전시하는 용도로는 부적합합니다.
- 트윗 아카이빙: jekyll-twitter-plugin과 연동해, 트윗 스니펫에 대한 스타일을 제공합니다.
- 단순함: 바닐라 CSS와 JS로 구성되어 있습니다.
- 가벼움: 기본 CSS와 JS를 합쳐 압축하지 않은 기준으로 약 20 KB로, 이는 JQuery 라이브러리의 1/4 크기입니다.
- 라이트/다크 모드 각각 지원: prefers-scheme-color를 통해 사용자가 선호하는 테마를 기본으로 보여주고, 헤더의 설정 버튼으로 사용자가 설정을 오버라이드할 수 있습니다.
- 사용자 지정 보기 설정: 테마를 선택하는 기능 외에도, 문단의 너비, 행간(줄간격), 글자 크기, 글꼴을 자유롭게 지정할 수 있어, 텍스트 읽기에 최적화되어 있습니다.

## 시작하기

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjuyuwol%2Fyuwolish) [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2Fjuyuwol%2Fyuwolish)

위의 버튼 중 하나를 누르면 설치 없이 간단하고 빠르게 시작할 수 있습니다.

기능은 제한되어 있으나 Github에서는 웹에서의 파일 추가와 편집을 지원하므로 PC에 추가적인 소프트웨어 설치 없이 사이트를 만들고 관리하는 것이 기술적으로 가능은 합니다.

Vercel과 Netlify 모두 무난하나 개인적으로는 빌드 속도가 더 빠르고 한국에 CDN이 있고 통계 기능이 자세한 Vercel을 추천합니다.

[풀 스크린샷 설치와 설정 과정 안내](https://juyuwol.postype.com/post/12502072)

***

아니면 그냥 저장소를 복제/포크하세요.

***

그다음 _config.yml을 안내에 따라 편집하고, 데모를 참조해 글을 쓰면 됩니다.

### 간략하게 무설치로 글쓰기

상단 Vercel에서 배포하기 버튼을 눌러 저장소를 복제했다는 전제 하에 진행됩니다.

1:

![](/doc/posting-01.png)


복제한 Github 저장소에 웹으로 들어가 [Add file] > [Create new file]을 선택합니다.

2:

![](/doc/posting-02.png)

``` markdown
---
title: "제목을 입력합니다"
description: "설명을 입력합니다. 메인/아카이브 페이지의 글 목록과 트위터 카드에 표시됩니다."
category: "fiction"
---
<div class="fic" markdown="1">

오늘도 또 우리 수탉이 막 쫓기었다. 내가 점심을 먹고 나무를 하러 갈 양으로 나올 때이었다. 산으로 올라서려니까 등뒤에서 푸드득푸드득, 하고 닭의 횃소리가 야단이다. 깜짝 놀라서 고개를 돌려보니 아니나다르랴, 두 놈이 또 얼리었다.

점순네 수탉(은 대강이가 크고 똑 오소리같이 실팍하게 생긴 놈)이 덩저리 작은 우리 수탉을 함부로 해내는 것이다. 그것도 그냥 해내는 것이 아니라 푸드득하고 면두를 쪼고 물러섰다가 좀 사이를 두고 푸드득하고 모가지를 쪼았다. 이렇게 멋을 부려 가며 여지없이 닦아 놓는다. 그러면 이 못생긴 것은 쪼일 적마다 주둥이로 땅을 받으며 그 비명이 킥, 킥, 할 뿐이다. 물론 미처 아물지도 않은 면두를 또 쪼이며 붉은 선혈은 뚝뚝 떨어진다.

이걸 가만히 내려다보자니 내 대강이가 터져서 피가 흐르는 것같이 두 눈에서 불이 번쩍 난다. 대뜸 지게막대기를 메고 달려들어 점순네 닭을 후려칠까 하다가 생각을 고쳐먹고 헛매질로 떼어만 놓았다.

이번에도 점순이가 쌈을 붙여 놨을 것이다. 바짝바짝 내 기를 올리느라고 그랬음에 틀림없을 것이다. 고놈의 계집애가 요새로 들어서 왜 나를 못 먹겠다고 고렇게 아르릉거리는지 모른다.

</div>
```

`_posts/yyyy-mm-dd-title.md` 형식으로 경로를 입력해, 새 포스트를 씁니다.

형식은 마크다운의 방언인 [Kramdown](https://kramdown.gettalong.org/syntax.html)의 문법을 참조하면 됩니다.

다 작성하면 [Commit new file]을 입력해 발행합니다.

3:

![](/doc/posting-03.png)

그냥 기다리면 자동으로 빌드가 시작되어 글이 발행됩니다.

4:

![](/doc/posting-04.png)

![](/doc/posting-05.png)

정상적으로 발행되었는지 확인합니다. 간단하죠?


## 라이선스

- 유월리시는 [MIT 라이선스](LICENSE.md)로 배포됩니다. 단, 포함된 폰트 파일은 이와는 별개로, 각 폰트 파일의 배포 조건에 따라 재배포됩니다.
- 한국장애인개발원에서 제공한 [KoddiUD 온고딕](https://www.koddi.or.kr/ud/sub1_2) 폰트는 CC BY-SA 라이선스에 따라 배포됩니다.
- 길형진 씨가 제공한 [Pretendard](https://cactus.tistory.com/306) 폰트는 SIL Open Font License에 따라 배포됩니다.
- 리디주식회사가 제공한 [리디바탕](https://ridicorp.com/ridibatang/) 폰트는 SIL Open Font License에 따라 배포됩니다.
- 네이버에서 제공한 [마루부리](https://hangeul.naver.com/) 폰트는 SIL Open Font License에 따라 배포됩니다.
