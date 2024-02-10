import React from "react";
import Layout from "../components/layout/Layout";

const About = () => {
  return (
    <Layout>
      {" "}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          justo vel fringilla faucibus, justo massa ultricies odio, eget aliquam
          libero ex ut mauris. In dictum, tellus vitae consectetur venenatis,
          sapien justo varius eros, sit amet molestie elit odio vel quam. Nulla
          facilisi. Aliquam erat volutpat. Donec nec felis ligula. Curabitur nec
          suscipit velit, nec posuere lacus.
        </p>
        <p className="text-lg mb-4">
          Nam vel odio eros. Cras condimentum diam sit amet est sagittis
          hendrerit. Integer vel efficitur est. In hac habitasse platea
          dictumst. Integer lacinia sollicitudin ante, vitae mattis dui suscipit
          at. Donec vulputate ipsum non ante euismod, ac dapibus tortor dapibus.
          Phasellus finibus, ligula et lobortis tristique, nulla justo facilisis
          nisl, id ullamcorper metus leo non eros. Donec blandit justo quis
          posuere bibendum.
        </p>
      </div>
    </Layout>
  );
};

export default About;
