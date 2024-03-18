export default defineI18nConfig(() => ({
  messages: {
    "en-US": {
      pagination: {
        next: 'Next',
        prev: 'Previous',
        of: 'of'
      },
      create_post: {
        submit_button_text: 'Create post',
        title_label: 'Enter post\'s title',
        lang_selectbox_label: 'Choose language',
        button_add_block_text: 'Add new block',
        image_block_label: 'Choose image...',
      },
      index: {
        loading_text: 'Loading...',
      },
      post_block_wrapper: {
        code_block_name: 'Code',
        image_block_name: 'Image',
        text_block_name: 'Text',
      }
    },
    "ru-RU": {
      pagination: {
        next: 'Следующая',
        prev: 'Предыдущая',
        of: 'из'
      },
      create_post: {
        submit_button_text: 'Создать статью',
        title_label: 'Введите название статьи',
        lang_selectbox_label: 'Выберите язык',
        button_add_block_text: 'Добавить блок',
        image_block_label: 'Выберите изображение...',
      },
      index: {
        loading_text: 'Loading...',
      },
      post_block_wrapper: {
        code_block_name: 'Код',
        image_block_name: 'Изображение',
        text_block_name: 'Текст',
      }
    }
  }
}))