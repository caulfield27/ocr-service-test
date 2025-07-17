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
    is_solved: false,
    code: "asffa",
  },
  {
    is_solved: true,
    code: "safahf",
  },
  {
    is_solved: false,
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

        let is_solved = true;

        for(const status of statuses){
          if(status.code === doc_type){
            status.is_solved = true;
          };

          if(!status.is_solved){
            is_solved = false;
          };
        };

        ctx.status = 200;
        ctx.body = {is_solved}
    }catch(e){
        console.error(e);
        ctx.status = 500;
        ctx.body = {message: "Ошибка сервера"}
    }
  }
};
