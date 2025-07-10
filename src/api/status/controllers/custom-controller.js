// SENT | SUCCESS | FAILURE
// {
//     TEMP_ID: STRING;
//     TEMP_LID: STRING;
//     TENP_S_FOLDER: STRING
// }

const result = {
  TEMP_ID: "test",
  TEMP_LID: "test",
  TEMP_S_FOLDER: "test",
};

module.exports = {
  async chekcStatus(ctx) {
    try {
      const { id } = ctx.params;
      if (!id) {
        ctx.status = 404;
        ctx.body = { message: "Страница не найдена" };
        return;
      }

      ctx.status = 200;
      if (!strapi.ocr_status) {
        strapi.ocr_status = "SENT";
        strapi.ocr_timeout = setTimeout(() => {
          strapi.ocr_status = "SUCCESS";
        }, 5000);
        ctx.body = {
          status: "SENT",
          result,
        };
      } else {
        if (strapi.ocr_status === "SUCCESS") {
          if (strapi.ocr_timeout) {
            clearTimeout(strapi.ocr_timeout);
          }
          strapi.ocr_status = false;
          ctx.body = {
            status: "SUCCESS",
            result,
          };
        } else {
          ctx.body = {
            status: "SENT",
            result,
          };
        }
      }
    } catch (e) {
      console.log("err: ", e);

      ctx.status = 500;
      ctx.body = { status: "FAILURE" };
    }
  },
};
