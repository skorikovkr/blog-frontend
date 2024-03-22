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
          description: 'Blog about web development (Laravel + Nuxt).',
          description_label: 'Description',
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
          write_new_post_button: 'Write new post',
          delete_post: 'Delete post'
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
        },
        concrete_post: {
          confirm_delete_dialog: 'Do you want to delete this post?',
          confirm_delete_header: 'Deleting post',
          confirm_delete_reject: 'Cancel',
          confirm_delete_accept: 'Delete',
          toast_delete_confirmed_summary: 'Confirmed',
          toast_delete_confirmed_detail: 'Post deleted',
          toast_delete_rejected_summary: 'Rejected',
          toast_delete_rejected_detail: 'Post not deleted',
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
          description: 'Мой блог о веб разработке (Laravel + Nuxt).',
          description_label: 'Описание',
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
          write_new_post_button: 'Написать статью',
          delete_post: 'Удалить статью'
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
        },
        concrete_post: {
          confirm_delete_dialog: 'Вы хотите удалить эту статью?',
          confirm_delete_header: 'Удаление статьи',
          confirm_delete_reject: 'Отмена',
          confirm_delete_accept: 'Подтвердить',
          toast_delete_confirmed_summary: 'Успех',
          toast_delete_confirmed_detail: 'Статья удалена',
          toast_delete_rejected_summary: 'Ошибка',
          toast_delete_rejected_detail: 'Ошибка при удалении статьи',
        }
      }
    }
  }
}))