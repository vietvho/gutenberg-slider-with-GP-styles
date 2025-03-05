<?php
/**
 * Plugin Name: Layout Spacing
 * Description: Adds a spacing setting inside a new section under the GeneratePress Layout panel in the WordPress Customizer.
 * Version: 1.0
 * Author: Warren Nguyen
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Winc_Customizer_Layout_Spacing {

    public function __construct() {
        add_action('customize_register', [$this, 'register_spacing_control'], 101);
        add_action('wp_head', [$this, 'apply_fe_css']);
        add_action('admin_footer', [$this, 'apply_admin_css']);
        add_filter('generateblocks_default_button_attributes', [$this,'winc_button_default_attributes'], 20);
        add_action( 'wp_enqueue_scripts', [$this,'winc_enqueue_script'] );
        add_action('init', [$this,'embla_slider_register_block']);
        add_action( 'enqueue_block_assets', [$this,'winc_slider_block_enqueue_block_assets'] );
    }

    public function winc_button_default_attributes() {
        $padding_button = get_option('button_spacing_settings');
        return [
            'styles' => [
                'display' => 'inline-flex',
                'alignItems' => 'center',
                'backgroundColor' => 'var(--accent)',
                'color' => 'var(--base-3)',
                'paddingTop' => $padding_button['button_top'].'px',
                'paddingRight' =>  $padding_button['button_right'].'px',
                'paddingBottom' => $padding_button['button_bottom'].'px',
                'paddingLeft' => $padding_button['button_left'].'px',
                'textDecoration' => 'none',
                'borderRadius' => get_option('winc_button_border_radius').'px',
                'borderWidth' => get_option('winc_button_border_width').'px',
                '&:is(:hover, :focus)' => [
                    'backgroundColor' => 'var(--accent-hover)',
                    'color' => 'var(--base-3)',
                ],
            ],
        ];
    }

    public function register_spacing_control($wp_customize) {
        // Ensure GeneratePress is active and the class exists
        if (!class_exists('GeneratePress_Spacing_Control')) {
            return;
        }

        $wp_customize->add_panel(
            'winc_button_panel',
            array(
                'priority' => 25,
                'title' => __( 'Buttons', 'wp' ),
            )
        );

        $button_padding_settings = array(
            'desktop_top'    => 'button_spacing_settings[button_top]',
            'desktop_right'  => 'button_spacing_settings[button_right]',
            'desktop_bottom' => 'button_spacing_settings[button_bottom]',
            'desktop_left'   => 'button_spacing_settings[button_left]',
        );

        foreach ($button_padding_settings as $key => $padding_settings) {
            $wp_customize->add_setting(
                $padding_settings,
                array(
                    'default' => $key,
                    'type' => 'option',
                    'sanitize_callback' => 'absint',
                    'transport' => 'postMessage',
                )
            );
            if (!class_exists("GeneratePress_Spacing_Control")):
                $wp_customize->add_control($padding_settings,[
                    'label'   => __( 'Button Spacing '.$key, 'wp' ),
                    'section' => 'winc_button_spacing_section',
                    'type'    => 'number',
                ]);
            endif;
        }

        // Add a new section inside the 'winc_button_panel'
        $wp_customize->add_section('winc_button_spacing_section', [
            'title'       => __('Default Config', 'wp'),
            'panel'       => 'winc_button_panel', // Place section inside this panel
            'priority'    => 30,
        ]);
        if (class_exists("GeneratePress_Spacing_Control")):
            $wp_customize->add_control(
                new GeneratePress_Spacing_Control(
                    $wp_customize,
                    'button_spacing',
                    array(
                        'type'     => 'generatepress-spacing',
                        'label'    => esc_html__( 'Buttons Padding', 'wp' ),
                        'section'  => 'winc_button_spacing_section',
                        'settings' => $button_padding_settings,
                        'element'  => 'content',
                        'priority' => 99,
                    )
                )
            );
        endif;

        // Border Radius Setting
        $wp_customize->add_setting('winc_button_border_radius', [
            'default'           => '0',
            'type' => 'option', 
            'sanitize_callback' => 'absint',
            'transport'         => 'postMessage',
            'input_attrs' => [
                'suffix' => 'px',
                'min'    => 0,
                'step'   => 1,
            ],
        ]);

        // Border Radius Control
        $wp_customize->add_control('winc_button_border_radius',[
            'label'   => __( 'Border Radius', 'wp' ),
            'section' => 'winc_button_spacing_section',
            'type'    => 'number',
        ]);

         // Border Width Setting
        $wp_customize->add_setting('winc_button_border_width', [
            'default'           => '1',
            'sanitize_callback' => 'absint',
            'type' => 'option',
            'transport'         => 'postMessage',
            'input_attrs' => [
                'suffix' => 'px',
                'min'    => 0,
                'step'   => 1,
            ],
        ]);

        // Border Width Control
        $wp_customize->add_control('winc_button_border_width',[
            'label'   => __( 'Border Width', 'wp' ),
            'section' => 'winc_button_spacing_section',
            'type'    => 'number',
        ]);
    }

    public function apply_fe_css() {
        $border_radius = get_option('winc_button_border_radius');
        $border_width = get_option('winc_button_border_width');
        $padding_button = get_option('button_spacing_settings');
      ?>
        <style>
            body {
                --border-radius:<?=$border_radius;?>px;
                --border-width:<?=$border_width;?>px;
                --padding: <?=$padding_button["button_top"]?>px <?=$padding_button['button_right'];?>px <?=$padding_button['button_bottom'];?>px <?=$padding_button['button_left']?>px;
            }
        </style>
    <?}

    public function apply_admin_css(){ 
        $border_radius = get_option('winc_button_border_radius');
        $border_width = get_option('winc_button_border_width');
        $padding_button = get_option('button_spacing_settings');
        ?>
        <style>
            body {
                --border-radius:<?=$border_radius;?>px;
                --border-width:<?=$border_width;?>px;
                --padding: <?=(int)$padding_button["button_top"]?>px <?=(int)$padding_button['button_right'];?>px <?=(int)$padding_button['button_bottom'];?>px <?=(int)$padding_button['button_left']?>px;
            }
            <?= file_get_contents( __DIR__ . '/css/admin/style.css' );?>

        </style>
    <?php }

     public function winc_enqueue_script( ) {
         wp_enqueue_style( 'winc_script', plugin_dir_url( __FILE__ ) . 'css/frontend/style.css' );
    }

    public function winc_add_editor_styles( $editor_styles ) {
        echo 'here';
        $editor_styles[] = plugin_dir_url( __FILE__ ) . 'css/admin/style.css';
        var_dump($editor_styles);

		return $editor_styles;
	}

    public function winc_slider_block_enqueue_block_assets() {
        wp_enqueue_script(
            'embla-slider-editor-js',
            plugins_url('build/index.js', __FILE__),
            ['wp-blocks', 'wp-editor', 'wp-element'],
            filemtime(plugin_dir_path(__FILE__) . 'build/index.js'),
            true
        );

        wp_localize_script(
            'embla-slider-editor-js',
            'emblaSliderData',
            ['pluginUrl' => plugins_url('/', __FILE__)]
        );
    }

    public function embla_slider_register_block() {
        // wp_register_script(
        //     'embla-slider-block',
        //     plugins_url('build/index.js', __FILE__),
        //     array('wp-blocks', 'wp-editor', 'wp-components', 'wp-element'),
        //     filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
        // );

        // register_block_type('custom/embla-slider', array(
        //     'editor_script' => 'embla-slider-block',
        // ));
        // register_block_type( 'gutenberg-slider-block/slider', array(
        //     'editor_script' => 'gutenberg-slider-block-block-js',
        //     'editor_style'  => 'gutenberg-slider-block-block-css',
        //     'style'         => 'gutenberg-slider-block-block-css',
        // ) );
        register_block_type(__DIR__);
    }
    
}

new Winc_Customizer_Layout_Spacing();
