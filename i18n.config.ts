export default defineI18nConfig(() => ({
  messages: {
    "en-US": {
      pagination: {
        next: 'Next',
        prev: 'Previous',
        of: 'of'
      },
      header: {
        nav: {
          links: {
            home_title: 'Home',
            posts_title: 'Posts',
            login_title: 'Login',
            logout_title: 'Logout',
          }
        }
      },
      footer: {
        my_telegram: 'My Telegram:'
      },
      index: {
        loading_text: 'Loading...',
        meta: {
          title: 'Home',
          description: 'Blog about web development (Laravel + Nuxt).'
        },
        my_blog: 'My blog.',
        text_1: 'This blog is my pet project.',
        text_2: 'Used tech stack:',
      },
      login: {
        email: 'Email',
        password: 'Password',
        remember_me: 'Remember me',
        submit_button_title: 'Login'
      },
      posts: {
        index: {
          meta: {
            title: 'All posts',
            description: 'All posts of my blog about web development.',
            published_on: 'Published on'
          },
          no_description: 'No description',
          write_new_post_button: 'Write new post'
        },
        create: {
          meta: {
            title: 'Create post'
          },
          submit_button_text: 'Create post',
          title_label: 'Enter post\'s title',
          lang_selectbox_label: 'Choose language',
          button_add_block_text: 'Add new block',
          image_block_label: 'Choose image...',
          description_label: 'Enter description:'
        }
      }
    },
    "ru-RU": {
      pagination: {
        next: 'Следующая',
        prev: 'Предыдущая',
        of: 'из'
      },
      header: {
        nav: {
          links: {
            home_title: 'Дом',
            posts_title: 'Статьи',
            login_title: 'Логин',
            logout_title: 'Выйти',
          }
        }
      },
      footer: {
        my_telegram: 'Мой телеграм:'
      },
      index: {
        loading_text: 'Загрузка...',
        meta: {
          title: 'Домашняя страница',
          description: 'Мой блог о веб разработке (Laravel + Nuxt).'
        },
        my_blog: 'Мой блог.',
        text_1: 'Блог является одним из моих личных проектов.',
        text_2: 'Используемый стек:',
      },
      login: {
        email: 'Электронная почта',
        password: 'Пароль',
        remember_me: 'Запомнить меня',
        submit_button_title: 'Авторизоваться'
      },
      posts: {
        index: {
          meta: {
            title: 'Все статьи',
            description: 'Все статьи моего блога о веб-разработке.',
            published_on: 'Опубликовано'
          },
          no_description: 'Нет описания',
          write_new_post_button: 'Написать статью'
        },
        create: {
          meta: {
            title: 'Создание статьи'
          },
          submit_button_text: 'Опубликовать статью',
          title_label: 'Введите заголовок статьи',
          lang_selectbox_label: 'Выберите язык',
          button_add_block_text: 'Добавить блок',
          image_block_label: 'Выбрать изображение...',
          description_label: 'Введите описание:'
        }
      }
    }
  }
}))