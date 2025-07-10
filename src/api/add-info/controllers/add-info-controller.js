const mokData = {
  is_solved: false,
  pending: [
    {
      code: "asffa",
      name: "Военный билет",
      error_id: 0,
      error_reason: "no reason for error",
      description: "Сфотографируйте документ и нажмите кнопку отправить",
      required: true,
    },
    {
      code: "safahf",
      name: "Свидетельство о браке",
      error_id: 0,
      error_reason: "no reason for error",
      description: "Сфотографируйте документ и нажмите кнопку отправить",
      required: false,
    },
    {
      code: "qwrwq",
      name: "Справка с место жительства",
      error_id: 0,
      error_reason: "no reason for error",
      description: "Сфотографируйте документ и нажмите кнопку отправить",
      required: true,
    },
  ],
};

const statuses = [
  {
    isSolved: false,
    code: "asffa",
  },
  {
    isSolved: true,
    code: "safahf",
  },
  {
    isSolved: false,
    code: "qwrwq",
  }
]

module.exports = {
  async getAddInfo(ctx) {
    try {
      const { query } = ctx;

      if (!query?.key) {
        ctx.status = 404;
        ctx.body = { message: "страница не найдена" };
        return;
      }

      ctx.status = 200;
      ctx.body = mokData;
    } catch (e) {
      console.error(e);
      ctx.status = 500;
      ctx.body = {message: "Ошибка сервера"};
    }
  },
  async postAddInfo(ctx){
    try{
        const {request} = ctx;
        const {doc_type} = request?.body;

        if(!doc_type){
          ctx.status = 400;
          ctx.body = {message: "Неверныйы запрос"};
          return;
        };

        let isSolved = true;

        for(const status of statuses){
          if(status.code === doc_type){
            status.isSolved = true;
          };

          if(!status.isSolved){
            isSolved = false;
          };
        };

        ctx.status = 200;
        ctx.body = {isSolved}
    }catch(e){
        console.error(e);
        ctx.status = 500;
        ctx.body = {message: "Ошибка сервера"}
    }
  }
};
