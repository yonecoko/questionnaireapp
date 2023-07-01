import { useForm, Controller } from "react-hook-form";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import { useState } from "react";

export default function Home() {
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [showAdditionalQuestion, setShowAdditionalQuestion] = useState(false);
  const [additionalAnswer, setAdditionalAnswer] = useState("");

  const handleAnswer3Change = (e) => {
    setAnswer3(e.target.value);
    setShowAdditionalQuestion(e.target.value === "はい" || answer4 === "はい");
  };

  const handleAnswer4Change = (e) => {
    setAnswer4(e.target.value);
    setShowAdditionalQuestion(answer3 === "はい" || e.target.value === "はい");
  };

  const handleAdditionalAnswerChange = (e) => {
    setAdditionalAnswer(e.target.value);
  };

  const onSubmit = function (data) {
    console.log(data.name);
    console.log(data.additionalAnswer);
  };

  const { register, handleSubmit, formState: { errors }, control } = useForm();

  return (
    <Container>
      <h1>プログラミング学習に関するアンケート</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Q1. 名前を入力してください（匿名可）。</label>
          <Controller
            name="name"
            defaultValue=""
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input value={value} onChange={onChange} />
            )}
          />
          {errors.name && errors.name.type === "required" && (
            <span>このフィールドは回答必須です。</span>
          )}
        </div>
        <div>
          <label htmlFor="birth">
            Q2. 生年月日を入力してください（例：19910101）。
          </label>
          <Controller
            name="birth"
            defaultValue=""
            control={control}
            rules={{ required: true, pattern: /^[0-9]{8}$/ }}
            render={({ field: { value, onChange } }) => (
              <Input value={value} onChange={onChange} />
            )}
          />
          {errors.birth && errors.birth.type === "required" && (
            <span>このフィールドは回答必須です。</span>
          )}
          {errors.birth && errors.birth.type === "pattern" && (
            <span>整数8桁で入力してください。</span>
          )}
        </div>
        <div>
          <span>Q3. 現在、プログラミングを学習していますか？</span>
          <input
            id="isStudy1"
            {...register("isStudy", { required: "このフィールドは回答必須です。" })}
            type="radio"
            value="はい"
            name="isStudy"
            checked={answer3 === "はい"}
            onChange={handleAnswer3Change}
          />
          <label htmlFor="isStudy1">はい</label>

          <input
            id="isStudy2"
            {...register("isStudy", { required: "このフィールドは回答必須です。" })}
            type="radio"
            value="いいえ"
            name="isStudy"
            checked={answer3 === "いいえ"}
            onChange={handleAnswer3Change}
          />
          <label htmlFor="isStudy2">いいえ</label>
          {errors.isStudy && (
            <span>このフィールドは回答必須です。</span>
          )}
        </div>
        <div>
          <span>Q4. これまでに、プログラミングを学習したことがありますか？</span>
          <input
            id="wasStudy1"
            {...register("wasStudy", { required: "このフィールドは回答必須です。" })}
            type="radio"
            value="はい"
            name="wasStudy"
            checked={answer4 === "はい"}
            onChange={handleAnswer4Change}
          />
          <label htmlFor="wasStudy1">はい</label>

          <input
            id="wasStudy2"
            {...register("wasStudy", { required: "このフィールドは回答必須です。" })}
            type="radio"
            value="いいえ"
            name="wasStudy"
            checked={answer4 === "いいえ"}
            onChange={handleAnswer4Change}
          />
          <label htmlFor="wasStudy2">いいえ</label>
          {errors.wasStudy && (
            <span>このフィールドは回答必須です。</span>
          )}
        </div>

        {showAdditionalQuestion && (
  <div>
    <p>今まで学習したことのあるプログラミング言語をすべて教えてください:</p>
    <input
      type="text"
      defaultValue={additionalAnswer}
      onChange={handleAdditionalAnswerChange}
      {...register("additionalAnswer")}
    />
  </div>
)}

        <button type="submit">アンケートを提出する</button>
      </form>
    </Container>
  );
}
