<template>
  <div class="mt-8">
    <h3>FAQ's</h3>
    <ul class="mt-4">
      <li v-for="q in faqs" class="mb-4">
        <h4 v-html="formatQuestion(q.question, q.img)"></h4>
        <p>{{ q.answer }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const faqs = ref([
    {
      question: 'What are the 3 links?',
      img: `<i class="fa-solid fa-fire-flame-curved text-secondary"></i>`,
      answer: `This is the real 💪 of Crushing Digital. Our belief is that we, as developers, need to improve how
      we present ourselves. These 3 links are your opportunity to sell or market yourself. Don't overthink it, but at
      the same time, don't waste it. It could be a link to something in addition to your GitHub or LinkedIn profile (both
      of which you can enter on the site), but they could also be pointing to the highlights of those profiles. Do you
      have a blog, personal website/project or perhaps some content that showcases your skills and experience?`,
    },
    {
      question: 'Will I receive lots of emails?',
      answer: `We only email you about your account. Currently, this is limited to notifying you that your profile has
      been reviewed and feedback is waiting for you. There are no plans for any other types of emails. 
      We will NEVER sell or misuse your information. EVER.`,
    },
    {
      question: 'Can I hide my salary?',
      answer: `Monthly rate on the site is NOT your actual salary. Salary is subjective. You might request more money for
      a role upon hearing the requirements and expectations. This is purely down to search filtering. Is there
      a minimum limit you do not wish to be contacted for? Set the monthly rate. You are telling employers and recruiters that 
      you are open to negotiation above that rate once you hear more about the role. Open to all offers? Lower that rate and
      appear in more searches!`,
    },
    {
      question: 'What is verification?',
      img: `<i class="fa-solid fa-clipboard-check text-green-500"></i>`,
      answer: `Recruiters spend most of their time filtering profiles, looking for those that warrant more time
      and attention. Is this profile a good fit for their requirements. This is a tall order if the recruiter is not 
      technical. Verification is our stamp to say this profile demonstrates the qualities showcased in the list. So, 
      if the developer says they are a ReactJS developer and they are verified, we agree that this profile shows 
      significant promise.`,
    },
    {
      question: 'What is Approval?',
      img: `<i class="fa-solid fa-star text-yellow-400"></i>`,
      answer: `This is the pinnacle of Crushing Digital approval. We think this developer rocks. Approval is limited to those developers
      who are already Verified. Therefore, this stamp of approval indicates not just that their profile shows promise, but
      that they ahve been throught the Crushing Digital technical vetting process and we are happy to endorse that this developer
      has the skills to pay the bills 😉`,
    },
    {
      question: 'How do I become a Crushing Digital verified developer?',
      img: `<i class="fa-solid fa-clipboard-check text-green-500"></i>`,
      answer: `The good news is that this is automated. Sign up and save your profile and the verification process will begin. Don't
      worry, it's all FREE. If your profile meets the standard, you will be verified. If your profile needs work, you will
      receive feedback via the 🔔 page. Each change will trigger a profile review. We can work on this together until you become
      a verified developer!`,
    },
    {
      question: 'How to get approved?',
      img: `<i class="fa-solid fa-star text-yellow-400"></i>`,
      answer: `Once you are Verified, you can apply for Approval. This is currently a manual process and you can email david@crushing.digital
      to begin the process.`,
    },
    {
      question: 'Do I need a minimum level of experience to be verified/approved?',
      answer: `No! As developers, we recognise that skills are not related to years of experience. We do not discriminate on
      these grounds.`,
    },
  ])

  const formatQuestion = (text: string, img: string | undefined) => {
    if (img) return img + ' ' + text

    return text
  }
</script>

<style scoped></style>
