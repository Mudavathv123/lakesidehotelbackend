package com.example.lakesidehotel.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary getCloudinary() {

        Map config = new HashMap();
        config.put("cloud_name", "dnml2vs6t");
        config.put("api_key", "155457743688833");
        config.put("api_secret", "udF3D_Nt4fShLyPBA3F6_zjG04w");
        config.put("secure", true);

        return new Cloudinary(config);
    }

}
