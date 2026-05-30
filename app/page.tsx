import SubmissionForm from "@/components/submission-form";

export default function Home() {
  return (
    <main className="shell hero">
      <section className="hero-copy">
        <p className="eyebrow">匿名树洞</p>
        <h1>把想说但不方便说的话，安静放在这里。</h1>
      </section>
      <SubmissionForm />
    </main>
  );
}
