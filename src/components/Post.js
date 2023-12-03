import React, { useEffect, useState } from "react";

const Post = ({ _id, title, subtitle, mediaType, mediaUrl, idx }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1050);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1050);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isDesktop ? (
        idx % 2 === 1 ? (
          <div className="post">
            <div className="post-text text-right">
              <h2>{title}</h2>
              <p dangerouslySetInnerHTML={{ __html: subtitle }}></p>
            </div>
            <div className="post-media">
              {mediaType === "video" ? (
                <iframe
                  width="480"
                  height="270"
                  src={mediaUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <img className="post-media-image" src={mediaUrl} alt={title} />
              )}
            </div>
          </div>
        ) : (
          <div className="post">
            <div className="post-media">
              {mediaType === "video" ? (
                <iframe
                  width="480"
                  height="270"
                  src={mediaUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <img className="post-media-image" src={mediaUrl} alt={title} />
              )}
            </div>
            <div className="post-text text-left">
              <h2>{title}</h2>
              <p dangerouslySetInnerHTML={{ __html: subtitle }}></p>
            </div>
          </div>
        )
      ) : (
        <div className="post-mobile">
          <div className="post-media-mobile">
            {mediaType === "video" ? (
              <iframe
                width="360"
                height="202.5"
                src={mediaUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <img
                className="post-media-image-mobile"
                src={mediaUrl}
                alt={title}
              />
            )}
          </div>
          <div className="post-text-mobile">
            <h2>{title}</h2>
            <p dangerouslySetInnerHTML={{ __html: subtitle }}></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
